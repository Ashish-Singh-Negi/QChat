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
  const { setUserContact, getChatMessages } = useUserContactContext();
  const { userInfo } = useUserInfoContext();
  const { setRoomInfo } = useRoomContext();

  const [ContactInfo, setContactInfo] = useState<UserInfo | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);

  const joinRoomHandler = () => {
    setUserContact(ContactInfo);
    sendMessage({
      action: "JOIN",
      content: "joining room " + roomId,
      room: roomId,
    });

    getChatMessages(roomId);
    getChatRoomInfo();
  };

  const getChatRoomInfo = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: Room;
        };
      } = await axiosInstance.get(`/users/chats/${roomId}`);

      console.log(data.data);

      let isDisabled = false;
      if (data.data.participants.length < 2) isDisabled = true;

      const friendId = data.data.participants.filter(
        (id) => id !== userInfo?._id
      );

      setContactId(friendId[0]);

      setRoomInfo({ ...data.data, isDisabled: isDisabled });
    } catch (error: any) {
      toast.error(error?.response.data.error);
      console.error(error);
    }
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
    setUserContact(data.data);
  };

  useEffect(() => {
    getChatRoomInfo();
  }, []);

  useEffect(() => {
    if (!contactId) return;
    getContactInfo();
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
