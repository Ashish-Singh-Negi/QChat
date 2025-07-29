"use client";

import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";
import { Room, StoredMessage, UserInfo } from "../../Interface/definations";
import toast from "react-hot-toast";
import { useRoomContext } from "@/Context/RoomContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import ProfilePic from "./ProfilePic";
import { useWebSocketContext } from "@/Context/WebsocketContext";

const ContactCard = ({ roomId }: { roomId: string }) => {
  const { sendMessage } = useWebSocketContext();
  const { userInfo } = useUserInfoContext();
  const {
    
    getChatMessages,
    getContactInfo,
    userContacts,
    setUserContacts,
    setSelectedContact,
  } = useUserContactContext();
  const { setRoomInfo } = useRoomContext();

  const [contactInfo, setContactInfo] = useState<UserInfo | null>(null);
  const [contactId, setContactId] = useState<string | null>(null);
  const [contactMessages, setContactMessages] = useState<StoredMessage[] | []>(
    []
  );

  const joinRoomHandler = () => {
    // setUserContact(contactInfo);
    sendMessage({
      action: "JOIN",
      room: roomId,
      content: "joining room " + roomId,
    });

    (async () => {
      // TODO NO need of this call
      setContactMessages(await getChatMessages(roomId));
    })();

    userContacts.map((contact, index)=>{
      if(contact._id === contactId) setSelectedContact(index)
    })

    getChatRoomInfo();
  };

  const getChatRoomInfo = async () => {
    try {
      const response = await axiosInstance.get<{ data: Room }>(
        `/chats/${roomId}`
      );

      const room = response.data.data;

      console.log(room);

      setContactMessages(await getChatMessages(roomId));

      const friendId = room.participants.find((id) => id !== userInfo?._id);
      if (!friendId) return;

      setContactId(friendId);

      const isFriend = userInfo?.friends.some(
        (friend) => friend.id === friendId
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

  useEffect(() => {
    getChatRoomInfo();
  }, []);

  useEffect(() => {
    if (!contactId) return;
    (async () => {
      const contact = await getContactInfo(contactId);
      setContactInfo(contact);
      setUserContacts((prev) => [
        ...prev,
        { ...contact!, messages: [...contactMessages] },
      ]);
    })();
  }, [contactId]);

  if (!contactInfo) return;

  return (
    <div onClick={joinRoomHandler} className="h-[72px] w-full px-2 mb-1">
      <div className="h-full w-full hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={contactInfo.profilePic}
            username={contactInfo.username}
          />
        </div>
        <div className="h-14 w-[90%]">
          <p className="font-medium mt-1">{contactInfo?.username}</p>
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
