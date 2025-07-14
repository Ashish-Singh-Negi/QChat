import React, { useEffect, useState } from "react";
import { StoredMessage } from "../Interface/definations";
import RoomMessageCard from "./RoomMessageCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";
import { useUserInfoContext } from "@/Context/UserInfoContext";

const Messages = ({ messages }: { messages: StoredMessage[] }) => {
  const { userInfo } = useUserInfoContext();

  const [sortedMessages, setSortedMessages] = useState<
    | {
        date: string;
        messages: StoredMessage[];
      }[]
    | null
  >(null);

  const getMessageDate = (messageTime: string) => {
    const time = new Date(messageTime!);

    // Format date parts
    const day = String(time.getDate()).padStart(2, "0");
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const year = time.getFullYear();

    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (!messages.length) {
      setSortedMessages(null);
      return;
    }

    const tempSortedMessages: [
      {
        date: string;
        messages: StoredMessage[];
      }
    ] = [
      {
        date: getMessageDate(messages.at(-1)?.createdAt!),
        messages: [],
      },
    ];

    let i = 0;

    for (let j = messages.length - 1; j >= 0; j--) {
      if (
        tempSortedMessages[i].date === getMessageDate(messages[j].createdAt!)
      ) {
        tempSortedMessages[i].messages.unshift(messages[j]);
      } else {
        i++;
        tempSortedMessages.push({
          date: getMessageDate(messages[j].createdAt!),
          messages: [messages[j]],
        });
      }
    }

    if (
      tempSortedMessages[0].date ===
      getMessageDate(new Date().toLocaleDateString())
    ) {
      tempSortedMessages[0].date = "Today";
    }

    console.log("Reverse  ", tempSortedMessages);

    setSortedMessages(tempSortedMessages);
  }, [messages]);

  return (
    <>
      {sortedMessages?.map(({ date, messages }) => (
        <div className="px-10 mb-3" key={date}>
          <div className="sticky top-1 z-10 w-full flex justify-center mb-3">
            <p className="text-xs bg-white dark:bg-gray-900 rounded-lg px-3 py-1 font-medium">
              {date}
            </p>
          </div>
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
      ))}
    </>
  );
};

export default Messages;
