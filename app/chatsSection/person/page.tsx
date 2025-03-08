"use client";

import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import ChatBox from "@/app/components/ChatBox/ChatBox";
import SendInp from "../../components/SendInp";
import ContextProvider from "../ContextProvider";
import { useWebSocket } from "@/hooks/useWebsocket";
import { Buffer } from "node:buffer";

function page() {
  const [messages, setMessages] = useState<string[] | []>([]);
  const { isConnected, isReconnecting, sendMessage } = useWebSocket(
    `ws://localhost:3000/chat`,
    {
      onOpen: () => console.log("Websocket Connected"),
      onMessage: (event) => {
        console.log("Sended Messages : ", JSON.parse(event.data).data);
        const data = JSON.parse(event.data);

        const buffer = Buffer.from(data.data.data);
        const message = buffer.toString().trim();

        setMessages((prev) => [...prev, message]);
      },
      onClose: () => console.log("Websocket Disconnected"),
      onError: (event) => console.error("Websocket Error : ", event),
    }
  );

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const sendMessageHandler = (message: string) => {
    sendMessage(message);
  };

  return (
    <div className="flex flex-col ">
      <div className="fixed right-0">
        <Header />
      </div>
      <div className="flex flex-col">
        {messages.map((message, index) => {
          return <ChatBox key={`${message}-${index}`} />;
        })}
        <SendInp sendMessageHandler={sendMessageHandler} />
      </div>
    </div>
  );
}

export default page;
