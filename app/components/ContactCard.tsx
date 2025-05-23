"use client";

import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";
import { Room, SendMessage, UserInfo } from "../Inteface/definations";
import toast from "react-hot-toast";
import { useRoomContext } from "@/Context/RoomContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";

const ContactCard = ({
  // contactId,
  roomId,
  sendMessage,
}: {
  // contactId: string;
  roomId: string;
  sendMessage: (dataIs: SendMessage) => void;
}) => {
  const { setUserContact, getChatMessages, getContactInfo } =
    useUserContactContext();
  const { userInfo } = useUserInfoContext();
  const { setRoomInfo } = useRoomContext();

  const [ContactInfo, setContactInfo] = useState<UserInfo | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);

  const joinRoomHandler = () => {
    setUserContact(ContactInfo);
    sendMessage({
      action: "JOIN",
      room: roomId,
      content: "joining room " + roomId,
    });

    getChatMessages(roomId);
    getChatRoomInfo();
  };

  const getChatRoomInfo = async () => {
    try {
      const response = await axiosInstance.get<{ data: Room }>(
        `/users/chats/${roomId}`
      );

      const room = response.data.data;

      const friendId = room.participants.find((id) => id !== userInfo?._id);
      if (!friendId) return;

      setContactId(friendId);

      if (userInfo?.friendList.indexOf(friendId) === -1) {
        setRoomInfo({ ...room!, isDisabled: true });
      } else {
        setRoomInfo({ ...room!, isDisabled: false });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch room info");
      console.error(error);
    }
  };

  useEffect(() => {
    getChatRoomInfo();
  }, []);

  useEffect(() => {
    if (!contactId) return;

    (async () => {
      const contact = await getContactInfo(contactId);
      setContactInfo(contact);
    })();
  }, [contactId]);

  return (
    <div
      onClick={joinRoomHandler}
      className="h-20 w-[420px] border-l-2 border-gray-800 bg-gray-200 hover:bg-gray-300 text-black dark:bg-black dark:hover:bg-gray-950 dark:text-white rounded-r-md flex items-center justify-center gap-4 p-2 mb-2 active:scale-95 cursor-pointer transition-transform "
    >
      <img
        src={ContactInfo?.profilePic}
        className="h-14 w-14 rounded-full"
        alt=""
      />
      <p className="font-medium">{ContactInfo?.username}</p>
      <p className="font-normal">{roomId}</p>
    </div>
  );
};

export default ContactCard;
