import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosinstance";

import { StoredMessage } from "../Inteface/definations";

import { BsPinFill } from "react-icons/bs";
import { TiStar } from "react-icons/ti";

const StarMessage = ({ starMessageId }: { starMessageId: string }) => {
  const [starMessage, setStarMessage] = useState<StoredMessage | null>(null);

  const getMessage = async () => {
    const {
      data,
    }: {
      data: {
        data: StoredMessage;
      };
    } = await axiosInstance.get(`/users/chats/messages/${starMessageId}`);

    setStarMessage(data.data);
  };

  useEffect(() => {
    getMessage();
  }, []);

  if (!starMessage) return;

  const time = new Date(starMessage!.createdAt!);
  const timeIs = time.toLocaleString();

  const splitedTime = timeIs.split(",")[1].split(":");
  const exectTime = `${splitedTime[0]}:${splitedTime[1]} ${
    splitedTime[2].split(" ")[1]
  }`;

  return (
    <div className="p-2 border-b-2 border-gray-800">
      <div className={`relative h-full w-full px-4 `}>
        <p className="absolute left-2 top-1 border-l-[14px] border-l-transparent border-t-[10px] border-t-gray-800"></p>
        <div
          className={`h-full w-fit px-2 rounded-lg bg-gray-800 text-gray-300 flex items-end`}
        >
          <p className="px-1 ">{starMessage.content}</p>
          <span className="h-full text-[8px] px-1 text-gray-400 flex items-end gap-[2px]">
            {starMessage.isStar && <TiStar className="h-3 w-3 mb-[2px]" />}
            {starMessage.isPinned && <BsPinFill className="h-2 w-2 mb-[2px]" />}
            {starMessage.isEdited && "Edited"}
            {exectTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StarMessage;
