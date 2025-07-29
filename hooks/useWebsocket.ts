import { SendMessage } from "@/Interface/definations";
import axiosInstance from "@/utils/axiosinstance";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

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

  const [roomId, setRoomId] = useState<string | null>(null);

  const webSocketRef = useRef<WebSocket | null>(null);
  const attemptRef = useRef(0);

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
    if (!isConnected && url) connectWebSocket();

    // Cleanup on component unmout
    return () => {
      if (webSocketRef.current) {
        webSocketRef.current.close();
      }
    };
  }, [url]);

  useEffect(() => {
    console.log("useWebSocket ROOM ID : ", roomId);
  }, [roomId]);

  const sendMessage = async (dataIs: SendMessage) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      // if previous roomID not match with current roomID -> LEAVE previous Room and join to new Room
      if (roomId !== dataIs.room) {
        const leaveRoom = {
          action: "LEAVE",
          message: "Leaving Room : " + roomId,
          room: roomId,
        };

        // send action message to Leave previous Room
        const buffer = Buffer.from(JSON.stringify(leaveRoom));
        webSocketRef.current.send(buffer);

        // Set new roomID
        setRoomId(dataIs.room);
      }

      const buffer = Buffer.from(JSON.stringify(dataIs));
      webSocketRef.current.send(buffer);

      // if (dataIs.action === "MESSAGE") {
        // const { data } = await axiosInstance.post(
        //   "users/chat/messages",
        //   dataIs
        // );
        // console.log(data);
      // }
    } else {
      console.error("WebSocket is not open, unable to send message.");
    }
  };

  return { isConnected, isReconnecting, sendMessage, roomId };
};
