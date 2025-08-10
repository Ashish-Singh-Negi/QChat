"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosinstance";

import { Room, StoredMessage } from "../../Interface/definations";

import { useRoomContext } from "@/Context/RoomContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";

import ProfilePic from "./ProfilePic";
import { useWebSocketContext } from "@/Context/WebsocketContext";

const ContactCard = ({
  chatId,
  contactId,
  index,
}: {
  chatId: string;
  index: number;
  contactId: string;
}) => {
  const { userInfo } = useUserInfoContext();
  const { getChatMessages, userContacts, setSelectedContact, selectedContact } =
    useUserContactContext();
  const { setRoomInfo } = useRoomContext();
  const { sendMessage } = useWebSocketContext();

  const [contactMessages, setContactMessages] = useState<StoredMessage[] | []>(
    []
  );

  const joinRoomHandler = () => {
    userContacts.map((contact, index) => {
      if (contact._id === contactId) setSelectedContact(index);
    });

    getChatRoomInfo();
  };

  // TODO send RoomId with message

  const getChatRoomInfo = async () => {
    try {
      const response = await axiosInstance.get<{ data: Room }>(
        `/chats/${chatId}`
      );

      const room = response.data.data;

      console.log(room);

      setContactMessages(await getChatMessages(chatId));

      const isFriend = userInfo?.friends.some(
        (friend) => friend.fid === contactId
      );

      if (isFriend) {
        setRoomInfo({ ...room!, isDisabled: false });
      } else {
        setRoomInfo({ ...room!, isDisabled: true });
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to fetch room info");
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getChatRoomInfo();
  // }, []);

  useEffect(() => {
    if (userContacts.length === 0) return;

    const intervalId = setInterval(() => {
      sendMessage({
        action: "CHECK_ONLINE_STATUS",
        receiver: userContacts[index]._id,
      });
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [userContacts]);

  if (!userContacts[index]) return;

  return (
    <div onClick={joinRoomHandler} className={`h-[72px] w-full px-2 mb-1`}>
      <div
        className={`h-full w-full ${
          index === selectedContact && "bg-gray-200 dark:bg-slate-900"
        } hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4 transition-all`}
      >
        <div className="h-14 w-14 text-2xl">
          {userContacts[index].profilePic && (
            <ProfilePic
              profilePic={userContacts[index].profilePic}
              username={userContacts[index].username}
            />
          )}
        </div>
        <div className="h-14 w-[90%]">
          <p className="font-medium mt-1 flex items-center gap-1">
            {userContacts[index].username}{" "}
            {userContacts[index].isOnline ? (
              <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
            ) : (
              <span className="h-2 w-2 bg-red-500 rounded-full"></span>
            )}
          </p>
          {contactMessages && contactMessages.length > 0 && (
            <p className="h-5 text-sm overflow-hidden">
              {contactMessages.at(-1)!.content.length! > 60
                ? `${contactMessages.at(-1)!.content.slice(0, 60)}...`
                : contactMessages.at(-1)!.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
