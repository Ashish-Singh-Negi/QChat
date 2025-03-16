import axiosInstance from "@/utils/axiosinstance";
import { useEffect, useRef, useState } from "react";

interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: Event) => void;
  onError?: (event: Event) => void;
  reconnectAttempts?: number;
  reconnectIntervel?: number;
}

export const useWebSocket = (
  url: string,
  options: UseWebSocketOptions = {}
) => {
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectAttempts = 5,
    reconnectIntervel = 3000,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const webSocketRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);

  const connectWebSocket = () => {
    setIsReconnecting(false);
    attemptRef.current = 0;

    const ws = new WebSocket(url);
    webSocketRef.current = ws;

    ws.onopen = (event) => {
      setIsConnected(true);
      setIsReconnecting(false);
      if (onOpen) onOpen(event);
    };

    ws.onmessage = (event) => {
      if (onMessage) onMessage(event);
    };

    ws.onclose = (event) => {
      setIsConnected(false);
      if (onClose) onClose(event);

      // Attempt Reconnect if allowed
      if (attemptRef.current < reconnectAttempts) {
        setIsReconnecting(true);
        attemptRef.current++;
        setTimeout(connectWebSocket, reconnectIntervel);
      }
    };

    ws.onerror = (event) => {
      if (onError) onError(event);
    };
  };

  useEffect(() => {
    connectWebSocket();

    // Cleanup on component unmout
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [url]);

  const sendMessage = async (dataIs: {
    action: "JOIN" | "LEAVE" | "MESSAGE";
    message: string;
    room?: string;
  }) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      const buffer = Buffer.from(JSON.stringify(dataIs));

      webSocketRef.current.send(buffer);

      console.log(dataIs);

      const { data } = await axiosInstance.post("/users/messages", {
        data: dataIs,
        sendTo: "67cd2d571d10653dbb470f99",
      });

      console.log(data);
    } else {
      console.error("WebSocket is not open, unable to send message.");
    }
  };

  return { isConnected, isReconnecting, sendMessage };
};
