import React, { useState } from "react";

import axiosInstance from "@/utils/axiosinstance";
import DialogBox from "./DialogBox";

import { StoredMessage } from "../Inteface/definations";
import { useWebSocketContext } from "@/Context/WebsocketContext";

import { IoBanSharp } from "react-icons/io5";
import { BsPinFill } from "react-icons/bs";
import { TiStar } from "react-icons/ti";

const SenderMessageCard = ({
  message,
  actionsHandler,
}: {
  message: StoredMessage;
  actionsHandler: (mid: string) => void;
}) => {
  const [edit, setEdit] = useState(false);
  const [editedContent, setEditContent] = useState(message.content);

  const { sendMessage, roomId } = useWebSocketContext();

  const editMessageHandler = (value: string) => {
    setEditContent(value);
  };

  const time = new Date(message.createdAt!);
  const timeIs = time.toLocaleString();

  const splitedTime = timeIs.split(",")[1].split(":");
  const exectTime = `${splitedTime[0]}:${splitedTime[1]} ${
    splitedTime[2].split(" ")[1]
  }`;

  const saveEditMessageHandler = async () => {
    if (message.content.trim() === editedContent.trim()) return;

    try {
      const { data } = await axiosInstance.patch("/users/chat/messages", {
        mid: message._id,
        newContent: editedContent,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });
  };

  return (
    <>
      {edit && (
        <DialogBox
          isOpen={edit}
          setIsOpen={setEdit}
          inputBox={true}
          primaryBtnAction={saveEditMessageHandler}
          primaryBtnText="Save"
          secondaryBtnText="Cancel"
          editContent={editedContent}
          editContentHandler={editMessageHandler}
          title={"Edit Message"}
        />
      )}
      {message.visibleToEveryone ? (
        message.visibleToSender && (
          <div
            onDoubleClick={() => actionsHandler(message._id!)}
            className={`relative h-fit w-full px-4 flex justify-end mb-[2px] ${
              edit && "bg-gray-400 dark:bg-gray-600 bg-opacity-40"
            }`}
            key={message._id}
          >
            <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-gray-700 dark:border-l-gray-900"></p>
            {message.content.length > 50 ? (
              <div
                className={`h-full w-full px-2 rounded-lg text-white dark:bg-gray-900`}
              >
                <p className="px-1 ">{message.content}</p>
                <span className="h-fit w-full text-[8px] px-1 text-gray-300 dark:text-gray-400 flex justify-end items-end gap-[2px]">
                  {message.isStar && <TiStar className="h-3 w-3 mb-[2px]" />}
                  {message.isPinned && (
                    <BsPinFill className="h-2 w-2 mb-[2px]" />
                  )}
                  {message.isEdited && "Edited"}
                  {exectTime}
                </span>
              </div>
            ) : (
              <div
                className={`h-full w-fit px-2 rounded-lg bg-gray-700 text-white dark:bg-gray-900 dark:text-gray-300 flex items-end`}
              >
                <p className="px-1 ">{message.content}</p>
                <span className="h-full w-fit text-[8px] px-1 text-white flex items-end gap-[2px]">
                  {message.isStar && <TiStar className="h-3 w-3 mb-[2px]" />}
                  {message.isPinned && (
                    <BsPinFill className="h-2 w-2 mb-[2px]" />
                  )}
                  {message.isEdited && "Edited"}
                  {exectTime}
                </span>
              </div>
            )}
          </div>
        )
      ) : (
        <div
          className={`relative h-fit w-full px-4 flex justify-end mb=[2px] ${
            edit && "bg-gray-600 bg-opacity-40"
          }`}
          key={message._id}
        >
          <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-gray-700 dark:border-l-gray-900"></p>
          <div
            className={`h-full w-fit px-2 rounded-lg bg-gray-700 text-gray-300 dark:bg-gray-900 dark:text-gray-400 flex items-center`}
          >
            <IoBanSharp className="inline" />
            <p className="px-1 italic">You deleted this message</p>
            <span className="h-full text-[8px] px-1 text-gray-300 dark:text-gray-400 flex items-end">
              {exectTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SenderMessageCard;
