"use client";

import PersonMd from "./PersonMd";
import PersonLg from "./PersonLg";
import ContextProvider from "../ContextProvider";
import "../../global.css";
import MainSec from "@/app/components/SideBar/MainSec";
import axiosInstance from "@/utils/axiosinstance";
import { useEffect, useState } from "react";
import { useWebSocket } from "@/hooks/useWebsocket";
import { useUserInfoContext } from "@/Context/UserInfoContext";

function page() {
  const { userInfo, setUserInfo } = useUserInfoContext();

  // const [messages, setMessages] = useState<string[]>([]);
  // const [action, setAction] = useState<"MESSAGE" | "JOIN" | "LEAVE">("MESSAGE");
  // const [roomId, setRoomId] = useState("");
  // const [textMessage, settextmessage] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useWebSocket(url, {
    onOpen: () => console.log("WebSocket connected"),
    onClose: () => console.log("WebSocket disconnected"),
    onError: (event) => console.error("WebSocket error:", event),
  });

  // const handleSendMessage = () => {
  //   if (textMessage?.trim()) {
  //     sendMessage({
  //       action: action,
  //       message: textMessage,
  //       room: roomId,
  //     });
  //   }
  // };

  // const actionHandler = () => {
  //   if (action === "MESSAGE") setAction("JOIN");
  //   else if (action === "JOIN") setAction("LEAVE");
  //   else setAction("MESSAGE");
  // };

  const getProfile = async () => {
    const {
      data,
    }: {
      data: {
        data: typeof userInfo;
      };
    } = await axiosInstance.get(`/users/profile`);
    console.log(data.data);

    setUserInfo(data.data);
  };

  // const roomIdHandler = (id: string) => {
  //   setRoomId(id);
  // };

  useEffect(() => {
    // getProfile();
    // setUrl("ws://localhost:3000/chat");
  }, []);

  return (
    <>
      <ContextProvider>
        <div>
          <MainSec />
        </div>
        <div className=" global-width fixed right-0">
          <PersonMd />
          <PersonLg />
        </div>
      </ContextProvider>
    </>
  );
}

export default page;
