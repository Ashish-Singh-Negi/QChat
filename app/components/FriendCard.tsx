import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { UserProfile } from "./WebSocket";
import { useUserContactContext } from "@/Context/UserContactContext";
import { SendMessage } from "../Inteface/definations";

const FriendCard = ({
  contactId,
  roomId,
  sendMessage,
}: {
  contactId: string;
  roomId: string;
  sendMessage: (dataIs: SendMessage) => void;
}) => {
  const [friendInfo, setFriendInfo] = useState<UserProfile | null>(null);

  const { setUserContact, getChatRoomMessages } = useUserContactContext();

  // const { isConnected, sendMessage } = useWebSocket(url, {
  //   onOpen: () => console.log("WebSocket connected"),
  //   onMessage: (event) => {
  //     console.log("Received message:", event.data);
  //     setMessages((prev) => [...prev, event.data]);
  //   },
  //   onClose: () => console.log("WebSocket disconnected"),
  //   onError: (event) => console.error("WebSocket error:", event),
  // });

  const joinRoomHandler = () => {
    setUserContact(friendInfo);
    sendMessage({
      action: "JOIN",
      content: "joining room " + roomId,
      room: roomId,
    });
    getChatRoomMessages(roomId);
  };

  const getfriendInfo = async () => {
    const {
      data,
    }: {
      data: {
        data: UserProfile;
      };
    } = await axiosInstance.get("/users/friends", {
      params: {
        fid: contactId,
      },
    });

    console.log(data);
    setFriendInfo(data.data);
  };

  useEffect(() => {
    getfriendInfo();
  }, []);

  return (
    <div
      onClick={joinRoomHandler}
      className="h-20 w-[420px] bg-black rounded-md flex items-center justify-center gap-4 p-2 m m-2 active:scale-95 cursor-pointer"
    >
      <p className="font-medium text-white">{friendInfo?.username}</p>
      <p className="font-normal text-white">{roomId}</p>
    </div>
  );
};

export default FriendCard;
