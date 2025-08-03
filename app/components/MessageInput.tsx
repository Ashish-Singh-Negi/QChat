import React, { FormEvent, useState } from "react";

import { RiSendPlaneFill } from "react-icons/ri";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useRoomContext } from "@/Context/RoomContext";

const MessageInput = () => {
  const [textMessage, setTextMessage] = useState<string | null>(null);

  const { sendMessage } = useWebSocketContext();
  const { userInfo } = useUserInfoContext();
  const { userContacts, selectedContact } = useUserContactContext();
  const { roomInfo } = useRoomContext();

  const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textMessage?.trim()) return;

    sendMessage({
      action: "CHAT_MESSAGE",
      content: textMessage.trim(),
      chatId: roomInfo?._id,
      sender: userInfo!._id,
      receiver: userContacts[selectedContact]?._id,
    });

    setTextMessage(null);
  };

  return (
    <>
      {roomInfo?.isDisabled ? (
        <div className="h-12 w-full flex items-center bg-gray-200 dark:bg-gray-900 opacity-50 rounded-3xl px-1">
          <input
            type="text"
            disabled
            className="h-8 w-full cursor-not-allowed rounded-2xl outline-none bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400  px-4 py-2 transition-all"
            placeholder="Type a message"
          />
          <button className="p-2 cursor-not-allowed flex justify-center items-center bg-gray-500 rounded-full text-white font-medium">
            <RiSendPlaneFill className="inline h-6 w-6" />
          </button>
        </div>
      ) : (
        <form
          onSubmit={sendMessageHandler}
          className="h-12 w-full flex items-center bg-white dark:bg-gray-900 rounded-3xl px-1"
        >
          <input
            type="text"
            value={textMessage || ""}
            onChange={(e) => setTextMessage(e.target.value)}
            className="h-8 w-full rounded-2xl outline-none bg-transparent caret-red-500 placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 py-2 transition-all"
            placeholder="Type a message"
          />
          <button className="p-2 flex justify-center items-center bg-red-500 rounded-full text-white font-medium active:scale-95 transition-all">
            <RiSendPlaneFill className="inline h-6 w-6" />
          </button>
        </form>
      )}
    </>
  );
};

export default MessageInput;
