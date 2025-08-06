import React, { useEffect, useState } from "react";
import { StoredMessage } from "../../Interface/definations";
import RoomMessageCard from "./RoomMessageCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { useUserContactContext } from "@/Context/UserContactContext";

const Messages = () => {
  const { userInfo } = useUserInfoContext();
  const { contactMessages } = useUserContactContext();

  const [sortedMessages, setSortedMessages] = useState<
    | {
        date: string;
        messages: StoredMessage[];
      }[]
  >([]);

  // const [unSeenMessages, setUnSeenMessages] = useState<
    // { date: string; messages: StoredMessage[] }[]
  //   StoredMessage[]
  // >([]);

  const getMessageDate = (messageTime: string) => {
    const time = new Date(messageTime ?? "");
    const day = String(time.getDate()).padStart(2, "0");
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const year = time.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (!contactMessages.length) {
      setSortedMessages([]);
      return;
    }

    const tempSortedMessages: [
      {
        date: string;
        messages: StoredMessage[];
      }
    ] = [
      {
        date: getMessageDate(
          contactMessages[contactMessages.length - 1]!.createdAt!
        ),
        messages: [],
      },
    ];

    let i = 0;

    for (let j = contactMessages.length - 1; j >= 0; j--) {
      if (
        tempSortedMessages[i].date ===
        getMessageDate(contactMessages[j].createdAt ?? "")
      ) {
        tempSortedMessages[i].messages.unshift(contactMessages[j]);
      } else {
        i++;
        tempSortedMessages.push({
          date: getMessageDate(contactMessages[j].createdAt ?? ""),
          messages: [contactMessages[j]],
        });
      }
    }

    const todayDate = getMessageDate(new Date().toISOString());

    if (tempSortedMessages[0].date === todayDate) {
      tempSortedMessages[0].date = "Today";
    }

    // TODO filter unseen messages and Seen Messages
    // const unseenMessagesByGroup = [];
    // let terminateLoop = false;

    // for (const sorted of tempSortedMessages) {
    //   if (terminateLoop) break;

    //   const unseen = [];

    //   for (let i = sorted.messages.length - 1; i >= 0; i--) {
    //     if (sorted.messages[i].status === "SEEN") {
    //       terminateLoop = true;
    //       break; // stops checking further messages in this group
    //     }
    //     if (sorted.messages[i].senderId === userInfo?._id) continue; // skip UNSEEN messages which are send by sender
    //     unseen.unshift(sorted.messages[i]);
    //   }

    //   unseenMessagesByGroup.push({ date: sorted.date, messages: unseen });
    // }

    // if (!unseenMessagesByGroup.length) return;
    // console.log("UNSEEN : ", unseenMessagesByGroup[0].messages);

    // console.log("Reverse  ", tempSortedMessages);

    setSortedMessages(tempSortedMessages);
  }, [contactMessages]);

  // TODO

  return (
    <>
      {sortedMessages?.map(({ date, messages }) => (
        <div className="mb-3 flex flex-col" key={date}>
          <div className="sticky z-10 top-1 w-full flex justify-center mb-3">
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
