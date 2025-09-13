"use client";

import React, { useEffect } from "react";

import { useChatsContext } from "@/Contexts/ChatsContext";
import { useUserContactContext } from "@/Contexts/UserContactContext";

import ProfilePic from "./ProfilePic";
import { useWebSocketContext } from "@/Contexts/WebsocketContext";
import { getMessageDate } from "@/utils/date";

const ContactCard = ({ chatId, index }: { chatId: string; index: number }) => {
  const { userContacts } = useUserContactContext();
  const { chatsMessagesMap } = useChatsContext();
  const { sendMessage } = useWebSocketContext();

  const { selectedChat, setCurrentChatId, chats } = useChatsContext();

  // check is any previous message exist or not
  const messages = chatsMessagesMap.get(chatId);
  let latestMessage = null;
  if (messages) {
    latestMessage = messages[0];
  }

  const joinRoomHandler = () => {
    chats?.map((chat) => chat._id === chatId && setCurrentChatId(chat._id));
  };

  // TODO uncomment below effect before any commit
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
    <div onClick={joinRoomHandler} className={`h-20 w-full px-2 mb-1`}>
      <div
        className={`h-full w-full ${
          chatId === selectedChat?._id && "bg-red-100 dark:bg-slate-900"
        } hover:bg-red-100 cursor-pointer dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4 transition-all`}
      >
        <div className="relative shrink-0 h-14 w-14 text-2xl rounded-full">
          {userContacts[index].profilePic && (
            <ProfilePic
              profilePic={userContacts[index].profilePic}
              username={userContacts[index].username}
            />
          )}
          {userContacts[index].isOnline && (
            <span className="absolute right-1 bottom-1 h-2 w-2 bg-emerald-300 dark:bg-emerald-500 rounded-full"></span>
          )}
        </div>
        <div className="h-14 w-[90%]">
          <p className="font-medium mt-1 flex items-center justify-between">
            {userContacts[index].username}
            {latestMessage && (
              <span className="text-sm font-normal px-2 text-gray-800 dark:text-gray-400">
                {getMessageDate(latestMessage.createdAt!)}
              </span>
            )}
          </p>
          {latestMessage && (
            <p className="h-5 text-sm text-gray-900 dark:text-gray-400 overflow-hidden">
              {latestMessage.content.length > 60
                ? `${latestMessage.content.slice(0, 60)}...`
                : latestMessage.content}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
