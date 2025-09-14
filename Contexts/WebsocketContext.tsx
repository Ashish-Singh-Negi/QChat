"use client";

import { useWebSocket } from "@/hooks/useWebsocket";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AckMessage,
  CheckUserOnlineStatus,
  Message,
  MessageStatus,
  OnlineStatusHeartbeat,
  PinMessage,
  RoomMessage,
  StoredMessage,
} from "@/types/definations";
import { useUserContactContext } from "./UserContactContext";
import { useUserInfoContext } from "./UserInfoContext";
import { useChatsContext } from "./ChatsContext";

type WebSocketContext = {
  isConnected: boolean;
  sendMessage: (
    dataIs:
      | Message
      | OnlineStatusHeartbeat
      | CheckUserOnlineStatus
      | AckMessage
      | RoomMessage
      | PinMessage
  ) => void;
  messages?: StoredMessage[] | [];
  setMessages: Dispatch<SetStateAction<StoredMessage[] | []>>;
};

const WebSocketContext = createContext<WebSocketContext | null>(null);

export default function WebSocketContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [messages, setMessages] = useState<StoredMessage[] | []>([]);

  const { userInfo } = useUserInfoContext();
  const {
    addMessageToChatsMessagesMap,
    updateMessageStatus,
    updateMessagePinStatus,
  } = useChatsContext();
  const { updateContactOnlineStatus } = useUserContactContext();

  const { isConnected, sendMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_BACKEND_URL}`,
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        console.log("Received message:", event.data);

        const parsed:
          | (Message & {
              _id: string;
              createdAt: string;
              status: MessageStatus;
            })
          | (OnlineStatusHeartbeat & {
              isOnline: boolean;
            })
          | (CheckUserOnlineStatus & {
              isOnline: boolean;
            })
          | AckMessage
          | PinMessage
          | RoomMessage = JSON.parse(event.data);

        switch (parsed.action) {
          case "ONLINE_STATUS_HEARTBEAT":
            updateContactOnlineStatus(parsed.sender, parsed.isOnline);

            break;

          case "CHECK_ONLINE_STATUS":
            updateContactOnlineStatus(parsed.receiver, parsed.isOnline!);
            break;

          case "CHAT_MESSAGE":
            const message: StoredMessage = {
              _id: parsed._id,
              chatId: parsed.chatId,
              senderId: parsed.sender,
              receiverId: parsed.receiver,
              content: parsed.content,
              createdAt: parsed.createdAt,
              updatedAt: new Date().toISOString(),
              isEdited: false,
              isPinned: false,
              isStar: false,
              visibleToEveryone: true,
              visibleToSender: true,
              status: parsed.status,
            };

            addMessageToChatsMessagesMap(parsed.chatId, message);

            console.log(parsed);

            // After receiving message Receiver will send MESSAGE_DELIVERED_ACKNOWLEDGEMENT to sender
            if (parsed.sender !== userInfo?._id)
              sendMessage({
                action: "MESSAGE_DELIVERED_ACKNOWLEDGEMENT",
                _id: parsed._id,
                sender: parsed.sender,
                chatId: parsed.chatId,
                status: "DELIVERED",
              });
            break;

          case "MESSAGE_DELIVERED_ACKNOWLEDGEMENT":
            updateMessageStatus(parsed.chatId, parsed._id, parsed.status);
            break;

          case "PIN":
            console.log(parsed);
            updateMessagePinStatus(parsed.chatId, parsed._id, parsed.isPinned);
            break;

          default:
            console.log("Action : ", parsed.action, "NOT exist");
            break;
        }
      },
      onClose: () => console.log("WebSocket disconnected"),
      onError: (event) => console.error("WebSocket error:", event),
    }
  );

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        // roomId,
        sendMessage,
        messages,
        setMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocketContext() {
  const context = useContext(WebSocketContext);

  if (!context)
    throw new Error(
      "useWebSocketContext must be used within WebSocketContextProvider"
    );

  return context;
}
