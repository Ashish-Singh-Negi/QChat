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

type WebSocketContext = {
  roomId: string | null;
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

  const { setContactMessages, setUserContacts } = useUserContactContext();
  const { isConnected, sendMessage, roomId } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_BACKEND_URL}`,
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        console.log("Received message:", event.data);

        const parsed: {
          action:
            | "JOIN"
            | "CHAT_MESSAGE"
            | "LEAVE"
            | "UPDATE"
            | "ONLINE_STATUS_HEARTBEAT"
            | "CHECK_ONLINE_STATUS";
          _id: string;
          sender: string;
          receiver: string;
          chatId?: string;
          content: string;
          createdAt: string;
          isOnline: boolean;
        } = JSON.parse(event.data);

        console.log("Received message : ", parsed);

        // if (parsed.action === "UPDATE") {
        //   getChatMessages(parsed.roomId!);
        //   return;
        // }

        if (parsed.action === "ONLINE_STATUS_HEARTBEAT") {
          console.log(parsed);

          setUserContacts((prev) =>
            prev.map((contact) =>
              contact._id === parsed.sender
                ? { ...contact, isOnline: true }
                : contact
            )
          );

          return;
        }

        if (parsed.action === "CHECK_ONLINE_STATUS") {
          setUserContacts((prev) =>
            prev.map((contact) =>
              contact._id === parsed.receiver
                ? { ...contact, isOnline: parsed.isOnline }
                : contact
            )
          );

          return;
        }

        if (parsed.action === "CHAT_MESSAGE")
          setContactMessages((prev) => [
            ...prev,
            {
              _id: parsed._id,
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
            },
          ]);
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
        roomId,
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
