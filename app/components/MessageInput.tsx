import React, { FormEvent, useState } from "react";

import { useWebSocketContext } from "@/Contexts/WebsocketContext";
import { useUserInfoContext } from "@/Contexts/UserInfoContext";
import { useUserContactContext } from "@/Contexts/UserContactContext";
import { useChatsContext } from "@/Contexts/ChatsContext";
import { Send } from "lucide-react";

const MessageInput = () => {
  const [textMessage, setTextMessage] = useState<string | null>(null);

  const { sendMessage } = useWebSocketContext();
  const { userInfo } = useUserInfoContext();
  const { selectedContact } = useUserContactContext();
  const { selectedChat } = useChatsContext();

  const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textMessage?.trim()) return;

    if (!selectedChat?._id) return;

    sendMessage({
      action: "CHAT_MESSAGE",
      content: textMessage.trim(),
      chatId: selectedChat._id,
      sender: userInfo!._id,
      receiver: selectedContact!._id,
    });

    setTextMessage(null);
  };

  if (!selectedChat) return;

  return (
    <>
      {
        <>
          {selectedChat.isDisabled ? (
            <div className="h-12 w-full flex items-center bg-gray-200 dark:bg-gray-900 opacity-50 rounded-3xl px-1">
              <input
                type="text"
                disabled
                className="h-8 w-full cursor-not-allowed rounded-2xl outline-none bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400  px-4 py-2 transition-all"
                placeholder="Type a message"
              />
              <button className="p-2 cursor-not-allowed flex justify-center items-center bg-gray-500 rounded-full text-white font-medium">
                <Send className="inline h-6 w-6" />
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
                <Send className="inline h-6 w-6" />
              </button>
            </form>
          )}
        </>
      }
    </>
  );
};

export default MessageInput;
