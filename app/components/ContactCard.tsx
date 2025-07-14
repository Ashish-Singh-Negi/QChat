"use client";

import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";
import { Room, SendMessage, UserInfo } from "../Interface/definations";
import toast from "react-hot-toast";
import { useRoomContext } from "@/Context/RoomContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import ProfilePic from "./ProfilePic";

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

  const [contactInfo, setContactInfo] = useState<UserInfo | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);

  const joinRoomHandler = () => {
    setUserContact(contactInfo);
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
        `/chats/${roomId}`
      );

      const room = response.data.data;

      console.log(room);

      const friendId = room.participants.find((id) => id !== userInfo?._id);
      if (!friendId) return;

      setContactId(friendId);

      if (userInfo?.friends.indexOf(friendId) === -1) {
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
    <div onClick={joinRoomHandler} className="h-[72px] w-full px-2 mb-1">
      <div className="h-full w-full hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={contactInfo?.profilePic!}
            username={contactInfo?.username!}
          />
        </div>
        <div className="h-14 w-[90%]">
          <p className="font-medium mt-1">{contactInfo?.username}</p>
          {/* <p className="text-sm">{roomId}</p> */}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
