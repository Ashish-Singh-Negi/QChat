import React, { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircleQuestionMark } from "lucide-react";

import { StoredMessage } from "../../types/definations";

import { useUserInfoContext } from "@/Contexts/UserInfoContext";
import { useChatsContext } from "@/Contexts/ChatsContext";

import RoomMessageCard from "./RoomMessageCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";
import { getMessageDate } from "@/utils/date";

const Messages = () => {
  const { userInfo } = useUserInfoContext();
  const { selectedChat, chatsMessagesMap } = useChatsContext();

  const [contactMessages, setContactMessages] = useState<StoredMessage[]>(
    selectedChat!._id! ? chatsMessagesMap.get(selectedChat!._id)! : []
  );

  const messagesRef = useRef<HTMLDivElement>(null);

  const OldMessages = useMemo(() => {
    if (!contactMessages.length) return [];

    const grouped = contactMessages.reduce((acc, msg) => {
      const date = getMessageDate(msg.createdAt!);
      if (!acc[date]) acc[date] = [];
      acc[date].unshift(msg);
      return acc;
    }, {} as Record<string, StoredMessage[]>);

    return Object.entries(grouped).map(([date, messages]) => ({
      date,
      messages,
    }));
  }, [contactMessages]);

  useEffect(() => {
    const newMessages = chatsMessagesMap.get(selectedChat!._id!);
    if (newMessages) setContactMessages(newMessages);
  }, [chatsMessagesMap]);

  if (!contactMessages.length)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center text-red-500">
        <MessageCircleQuestionMark />
        <p>No messages found</p>
      </div>
    );

  return (
    <>
      {OldMessages?.map(({ date, messages }) => (
        <div className="mb-3 flex flex-col" key={date}>
          <div className="sticky z-10 top-1 w-full flex justify-center mb-3">
            <p className="text-xs bg-white dark:bg-gray-900 rounded-lg px-3 py-1 font-medium">
              {date}
            </p>
          </div>
          <div ref={messagesRef}>
            {messages.map((msg) => {
              if (!msg.senderId) {
                return <RoomMessageCard key={msg._id} message={msg.content} />;
              }

              const isSender = msg.senderId === userInfo?._id;
              return isSender ? (
                <SenderMessageCard key={msg._id} message={msg} />
              ) : (
                <ReceiverMessageCard key={msg._id} message={msg} />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
