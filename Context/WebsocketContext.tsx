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

  const { getChatMessages, setContactMessages } = useUserContactContext();
  const { isConnected, sendMessage, roomId } = useWebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_BACKEND_URL}`,
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        console.log("Received message:", event.data);

        const parsed: {
          _id: string;
          sender: string;
          receiver: string;
          content: string;
          createdAt: string;
          roomId?: string;
        } = JSON.parse(event.data);

        console.log("Received message : ", parsed);

        if (!parsed.sender || !parsed.receiver || parsed.content === "UPDATE") {
          getChatMessages(parsed.roomId!);
          return;
        }

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
