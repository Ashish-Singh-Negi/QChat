import React from "react";

import { StoredMessage } from "../Inteface/definations";

import { IoBanSharp } from "react-icons/io5";
import { BsPinFill } from "react-icons/bs";
import { TiStar } from "react-icons/ti";

const ReceiverMessageCard = ({ message }: { message: StoredMessage }) => {
  const time = new Date(message.createdAt!);
  const timeIs = time.toLocaleString();

  const splitedTime = timeIs.split(",")[1].split(":");
  const exectTime = `${splitedTime[0]}:${splitedTime[1]} ${
    splitedTime[2].split(" ")[1]
  }`;

  return (
    <>
      {message.visibleToEveryone ? (
        <div className={`relative h-fit w-full px-4 flex `} key={message._id}>
          <p className="absolute left-2 top-[2px] border-l-[14px] border-l-transparent border-t-[10px] border-t-gray-800"></p>
          {message.content.length > 50 ? (
            <div
              className={`h-full w-fit px-2 rounded-lg bg-gray-800 text-gray-300`}
            >
              <p className="px-1">{message.content}</p>
              <span className="h-fit text-[8px] px-1 text-gray-400 flex justify-end items-end gap-[2px]">
                {message.isStar && <TiStar className="h-3 w-3 mb-[2px]" />}
                {message.isPinned && <BsPinFill className="h-2 w-2 mb-[2px]" />}
                {message.isEdited && "Edited"}
                {exectTime}
              </span>
            </div>
          ) : (
            <div
              className={`h-full w-fit px-2 rounded-lg bg-gray-800 text-gray-300 flex items-center`}
            >
              <p className="px-1">{message.content}</p>
              <span className="h-full text-[8px] px-1 text-gray-400 flex items-end gap-[2px]">
                {message.isStar && <TiStar className="h-3 w-3 mb-[2px]" />}
                {message.isPinned && <BsPinFill className="h-2 w-2 mb-[2px]" />}
                {message.isEdited && "Edited"}
                {exectTime}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className={`relative h-fit w-full px-4 flex `} key={message._id}>
          <p className="absolute left-2 top-[2px] border-l-[14px] border-l-transparent border-t-[10px] border-t-gray-800"></p>
          <div
            className={`h-full w-fit px-2 rounded-lg bg-gray-800 text-gray-400 flex items-center`}
          >
            <IoBanSharp className="inline" />
            <p className="px-1 italic">This message was deleted</p>
            <span className="h-full text-[8px] px-1 text-gray-400 flex items-end">
              {exectTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiverMessageCard;
