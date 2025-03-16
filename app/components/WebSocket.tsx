"use client";

import { useWebSocket } from "@/hooks/useWebsocket";
import React, { useEffect, useRef, useState } from "react";

const Websocket = () => {
  const [messages, setMessages] = useState<string[]>([]);

  const [action, setAction] = useState<"MESSAGE" | "JOIN" | "LEAVE">("MESSAGE");
  const [roomId, setRoomId] = useState("");
  const [textMessage, settextmessage] = useState<string | null>(null);

  const { isConnected, sendMessage } = useWebSocket(
    "ws://localhost:3000/chat",
    {
      onOpen: () => console.log("WebSocket connected"),
      onMessage: (event) => {
        console.log("Received message:", event.data);
        setMessages((prev) => [...prev, event.data]);
      },
      onClose: () => console.log("WebSocket disconnected"),
      onError: (event) => console.error("WebSocket error:", event),
    }
  );

  const handleSendMessage = () => {
    if (textMessage?.trim()) {
      sendMessage({
        action: action,
        message: textMessage,
        room: roomId,
      });
    }
  };

  const actionHandler = () => {
    if (action === "MESSAGE") setAction("JOIN");
    else if (action === "JOIN") setAction("LEAVE");
    else setAction("MESSAGE");
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <div className="mt-2">
        <p>
          Action :{" "}
          <button
            onClick={actionHandler}
            className="px-4 py-1 font-medium bg-black mb-2 active:scale-95 ml-1"
          >
            {action}
          </button>
        </p>
        <input
          type="text"
          placeholder="room id"
          onChange={(e) => setRoomId(e.target.value)}
          className="h-8 px-2 py-1 outline-none"
        />
      </div>
      <div className="my-2 ">
        <input
          type="text"
          placeholder="message"
          className="h-8 w-[320px] px-2 py-1 outline-none"
          onChange={(e) => settextmessage(e.target.value)}
        />
        <button
          className="px-4 py-1 ml-1 active:scale-95 bg-black font-medium"
          onClick={handleSendMessage}
          disabled={!isConnected}
        >
          Send Message
        </button>
      </div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Websocket;
