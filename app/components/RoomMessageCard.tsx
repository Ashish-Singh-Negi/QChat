import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import React, { useEffect, useState } from "react";
import { PiClockCountdown } from "react-icons/pi";

const RoomMessageCard = ({ message }: { message: string }) => {
  const { userInfo } = useUserInfoContext();
  const { userContact } = useUserContactContext();

  const [roomMessage, setRoomMessage] = useState("");

  useEffect(() => {
    const splitedMessage = message.split(":");

    console.log(" : ", splitedMessage);

    if (splitedMessage[0] === userInfo?._id) {
      setRoomMessage(`you ${splitedMessage[1]}`);
    } else {
      setRoomMessage(`${userContact?.username} ${splitedMessage[1]}`);
    }
  }, []);

  return (
    <div className="h-fit w-full px-16 flex justify-center my-[6px]">
      <p className="w-fit text-black dark:text-white bg-gray-300 dark:bg-gray-950 text-xs text-center rounded-xl font-normal px-4 py-[2px] my-1">
        <PiClockCountdown className="inline" /> {roomMessage}
      </p>
    </div>
  );
};

export default RoomMessageCard;
