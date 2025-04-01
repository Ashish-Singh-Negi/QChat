"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import SidebarNav from "./SidebarNav";
import Contacts from "./Contacts";
import Cat from "../../images/kitkit.jpeg";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { UserInfo } from "@/app/Inteface/definations";
import axiosInstance from "@/utils/axiosinstance";
import { UserProfile } from "../WebSocket";
import { useWebSocket } from "@/hooks/useWebsocket";

function MainSec() {
  const { userInfo } = useUserInfoContext();

  // const [messages, setMessages] = useState<string[]>([]);

  // const [action, setAction] = useState<"MESSAGE" | "JOIN" | "LEAVE">("MESSAGE");
  // const [textMessage, settextmessage] = useState<string | null>(null);
  // const [roomId, setRoomId] = useState("");
  // const [url, setUrl] = useState<string | null>(null);

  // const { sendMessage } = useWebSocket(url, {
  //   onOpen: () => console.log("WebSocket connected"),
  //   onMessage: (event) => {
  //     console.log("Received message:", event.data);
  //     setMessages((prev) => [...prev, event.data]);
  //   },
  //   onClose: () => console.log("WebSocket disconnected"),
  //   onError: (event) => console.error("WebSocket error:", event),
  // });

  // const handleSendMessage = () => {
  //   if (textMessage?.trim()) {
  //     sendMessage({
  //       action: action,
  //       message: textMessage,
  //       room: roomId,
  //     });
  //   }
  // };

  // const joinRoomHandler = (roomId: string) => {
  //   setRoomId(roomId);
  //   sendMessage({
  //     action: "JOIN",
  //     message: "Joining room " + roomId,
  //     room: roomId,
  //   });
  // };

  // const actionHandler = () => {
  //   if (action === "MESSAGE") setAction("JOIN");
  //   else if (action === "JOIN") setAction("LEAVE");
  //   else setAction("MESSAGE");
  // };

  // useEffect(() => {
  //   setUrl("ws://localhost:3000/chat");
  // }, []);

  return (
    <div className="w-[30vw] flex absolute left-0  overflow-hidden h-[100vh] color-lvl-1  ">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex flex-col h-[100vh] w-full ">
        <SidebarNav />

        <div className="flex w-full flex-col">
          {/* <Contacts texts={9} pfp={Cat} /> */}
          {userInfo?.friendList.map((friend) => (
            <Contacts
              key={friend.contactId}
              fid={friend.contactId}
              roomId={friend.roomId}
              // joinRoomHandler={joinRoomHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainSec;
