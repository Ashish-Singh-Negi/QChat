import React, { useEffect, useRef, useState } from "react";
import { MessageCircleQuestionMark } from "lucide-react";

import { PaginationMeta, StoredMessage } from "../../Interface/definations";

import { useUserInfoContext } from "@/Context/UserInfoContext";

import RoomMessageCard from "./RoomMessageCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";
import { getMessageDate } from "@/utils/date";
import { getChatMessages } from "@/utils/ChatService";
import { useChatsContext } from "@/Context/ChatsContext";
import Spinner from "./Spinner";

const Messages = () => {
  const { userInfo } = useUserInfoContext();
  const { selectedChat, chatsMessagesMap, chatMessagesPaginationMap } =
    useChatsContext();

  const [loading, setLoading] = useState(true);
  const [contactMessages, setContactMessages] = useState<StoredMessage[]>([]);
  const [categorizeMessagesByDate, setCatogorizeMessagesByDate] = useState<
    | {
        date: string;
        messages: StoredMessage[];
      }[]
  >([]);

  const [currentChatPagination, setCurrentChatPagination] =
    useState<PaginationMeta | null>(null);

  const messagesRef = useRef<HTMLDivElement>(null);

  const fetchOldChatMessages = async () => {
    const response: any = await getChatMessages(
      selectedChat!._id!,
      currentChatPagination!.nextPage!,
      currentChatPagination!.limit!
    );

    setContactMessages((prev) => [...prev, ...response.data.messages]);
    setCurrentChatPagination(response.data.pagination);
  };

  useEffect(() => {
    const chatPagination = chatMessagesPaginationMap.get(selectedChat!._id!);
    if (chatPagination) setCurrentChatPagination(chatPagination);
  }, [selectedChat]);

  useEffect(() => {
    const messages = chatsMessagesMap.get(selectedChat!._id!);
    if (messages) setContactMessages(messages);
  }, [chatsMessagesMap, selectedChat]);

  useEffect(() => {
    if (currentChatPagination?.nextPage === null) setLoading(false);
  }, [currentChatPagination]);

  useEffect(() => {
    const firstMessageElement = messagesRef.current?.firstElementChild;
    if (!firstMessageElement) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && currentChatPagination?.nextPage) {
        fetchOldChatMessages();
      }
    });

    observer.observe(firstMessageElement);

    return () => {
      observer.disconnect(); // safer than unobserve in dynamic DOM
    };
  }, [categorizeMessagesByDate]);

  useEffect(() => {
    if (!contactMessages || !contactMessages.length) {
      setCatogorizeMessagesByDate([]);
      return;
    }

    const messages = contactMessages;

    const tempCategorizeMessageByDate: {
      date: string;
      messages: StoredMessage[];
    }[] = [
      {
        date: getMessageDate(messages[0].createdAt!),
        messages: [],
      },
    ];

    let j = 0;

    for (let i = 0; i < contactMessages.length; i++) {
      if (
        tempCategorizeMessageByDate[j].date ===
        getMessageDate(contactMessages[i].createdAt!)
      ) {
        tempCategorizeMessageByDate[j].messages.unshift(contactMessages[i]);
      } else {
        tempCategorizeMessageByDate.push({
          date: getMessageDate(contactMessages[i].createdAt!),
          messages: [contactMessages[i]],
        });
        j++;
      }
    }

    setCatogorizeMessagesByDate(tempCategorizeMessageByDate);
  }, [contactMessages]);

  if (!contactMessages.length)
    return (
      <div className="h-full w-full flex flex-col justify-center items-center text-red-500">
        <MessageCircleQuestionMark />
        <p>No messages found</p>
      </div>
    );

  return (
    <>
      {categorizeMessagesByDate?.map(({ date, messages }) => (
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
      {loading && <Spinner />}
    </>
  );
};

export default Messages;
