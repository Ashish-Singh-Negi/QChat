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
import { SendMessage, StoredMessage } from "@/Interface/definations";
import { useUserContactContext } from "./UserContactContext";
import { useUserInfoContext } from "./UserInfoContext";
import { useChatsContext } from "./ChatsContext";

type WebSocketContext = {
  // roomId: string | null;
  isConnected: boolean;
  sendMessage: (dataIs: SendMessage) => void;
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
  const { addMessageToChatsMessagesMap, updateMessageStatus } =
    useChatsContext();
  const { updateContactOnlineStatus } = useUserContactContext();

  const { isConnected, sendMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_BACKEND_URL}`,
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        console.log("Received message:", event.data);

        const parsed: {
          action:
            | "CHAT_MESSAGE"
            | "ONLINE_STATUS_HEARTBEAT"
            | "CHECK_ONLINE_STATUS"
            | "MESSAGE_DELIVERED_ACKNOWLEDGEMENT";
          _id: string;
          sender: string;
          receiver: string;
          chatId: string;
          content: string;
          createdAt: string;
          isOnline: boolean;
          status: "SEND" | "DELIVERED" | "SEEN";
        } = JSON.parse(event.data);

        if (parsed.action === "ONLINE_STATUS_HEARTBEAT")
          updateContactOnlineStatus(parsed.sender, parsed.isOnline);

        if (parsed.action === "CHECK_ONLINE_STATUS")
          updateContactOnlineStatus(parsed.receiver, parsed.isOnline);

        if (parsed.action === "CHAT_MESSAGE") {
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

          // After recieving message Receiver will send MESSAGE_DELIVERED_ACKNOWLEDGEMENT to sender
          if (parsed.sender !== userInfo?._id)
            sendMessage({
              action: "MESSAGE_DELIVERED_ACKNOWLEDGEMENT",
              _id: parsed._id,
              sender: parsed.sender,
              chatId: parsed.chatId,
            });
        }

        if (parsed.action === "MESSAGE_DELIVERED_ACKNOWLEDGEMENT")
          updateMessageStatus(parsed.chatId, parsed._id, parsed.status);
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
