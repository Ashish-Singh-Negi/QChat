"use client";

import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";
import { Room, SendMessage, UserInfo } from "../Inteface/definations";
import toast from "react-hot-toast";
import { useRoomContext } from "@/Context/RoomContext";

const ContactCard = ({
  contactId,
  roomId,
  sendMessage,
}: {
  contactId: string;
  roomId: string;
  sendMessage: (dataIs: SendMessage) => void;
}) => {
  const [ContactInfo, setContactInfo] = useState<UserInfo | null>(null);

  const { setUserContact, getChatMessages } = useUserContactContext();
  const { setRoomInfo } = useRoomContext();

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
    setUserContact(ContactInfo);
    sendMessage({
      action: "JOIN",
      content: "joining room " + roomId,
      room: roomId,
    });

    getChatMessages(roomId, "messages");

    (async () => {
      try {
        const {
          data,
        }: {
          data: {
            data: Room;
          };
        } = await axiosInstance.get(`/users/chats/${roomId}/messages`);

        console.log(data.data);

        let isDisabled = false;
        if (data.data.participants.length < 2) isDisabled = true;

        setRoomInfo({ ...data.data, isDisabled: isDisabled });
      } catch (error: any) {
        toast.error(error?.response.data.error);
        console.error(error);
      }
    })();
  };

  const getContactInfo = async () => {
    const {
      data,
    }: {
      data: {
        data: UserInfo;
      };
    } = await axiosInstance.get(`/users/friends/${contactId}`);

    console.log(data);
    setContactInfo(data.data);
  };

  useEffect(() => {
    getContactInfo();
  }, []);

  return (
    <div
      onClick={joinRoomHandler}
      className="h-20 w-[420px] bg-black rounded-md flex items-center justify-center gap-4 p-2 mb-2 active:scale-95 cursor-pointer"
    >
      <img
        src={ContactInfo?.profilePic}
        className="h-14 w-14 rounded-full"
        alt=""
      />
      <p className="font-medium text-white">{ContactInfo?.username}</p>
      <p className="font-normal text-white">{roomId}</p>
    </div>
  );
};

export default ContactCard;
