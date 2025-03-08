"use client";

import { useWebSocket } from "@/hooks/useWebsocket";
import React, { useEffect, useState } from "react";

const Websocket = () => {
  const [messages, setMessages] = useState<string[]>([]);

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
      sendMessage(textMessage);
    }
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
      <input type="text" onChange={(e) => settextmessage(e.target.value)} />
      <button
        className="px-2"
        onClick={handleSendMessage}
        disabled={!isConnected}
      >
        Send Message
      </button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default Websocket;
