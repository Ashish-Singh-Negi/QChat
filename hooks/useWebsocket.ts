import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { useUserInfoContext } from "@/Context/UserInfoContext";
import { SendMessage } from "@/Interface/definations";

interface UseWebSocketOptions {
  onOpen?: (event: Event) => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: (event: Event) => void;
  onError?: (event: Event) => void;
  reconnectAttempts?: number;
  reconnectIntervel?: number;
  setMessages?: Dispatch<SetStateAction<string[] | []>>;
}

export const useWebSocket = (
  url: string | null,
  options: UseWebSocketOptions = {}
) => {
  const {
    onOpen,
    onMessage,
    onClose,
    onError,
    reconnectAttempts = 5,
    reconnectIntervel = 3000,
    // setMessages,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [isReconnecting, setIsReconnecting] = useState(false);

  const { userInfo } = useUserInfoContext();

  const [roomId, setRoomId] = useState<string | null>(null);

  const webSocketRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);

  let pingInterval: ReturnType<typeof setInterval> | undefined;

  const connectWebSocket = () => {
    if (!url) return;

    setIsReconnecting(false);
    attemptRef.current = 0;

    const ws = new WebSocket(url);
    webSocketRef.current = ws;

    ws.onopen = (event) => {
      setIsConnected(true);
      setIsReconnecting(false);
      if (onOpen) onOpen(event);

      pingInterval = setInterval(() => {
        sendMessage({
          action: "ONLINE_STATUS_HEARTBEAT",
          sender: userInfo?._id,
        });
      }, 3000);
    };

    ws.onmessage = (event) => {
      if (onMessage) {
        onMessage(event);
        console.log("Event ", event);
      }
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
    console.log(userInfo);
    if (!userInfo) return;

    if (!isConnected && url) connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [url, userInfo]);

  useEffect(() => {
    console.log("useWebSocket ROOM ID : ", roomId);
  }, [roomId]);

  const sendMessage = async (dataIs: SendMessage) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      const buffer = Buffer.from(JSON.stringify(dataIs));
      webSocketRef.current.send(buffer);
    } else {
      console.error("WebSocket is not open, unable to send message.");
    }
  };

  return { isConnected, isReconnecting, sendMessage, roomId, setRoomId };
};
