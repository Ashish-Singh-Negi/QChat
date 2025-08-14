import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { ClockFading } from "lucide-react";
import React, { useEffect, useState } from "react";

const RoomMessageCard = ({ message }: { message: string }) => {
  const { userInfo } = useUserInfoContext();
  const { selectedContact } = useUserContactContext();

  const [roomMessage, setRoomMessage] = useState("");

  useEffect(() => {
    const splitedMessage = message.split(":");

    console.log(" : ", splitedMessage);

    if (splitedMessage[0] === userInfo?._id) {
      setRoomMessage(`you ${splitedMessage[1]}`);
    } else {
      setRoomMessage(`${selectedContact?.username} ${splitedMessage[1]}`);
    }
  }, []);

  return (
    <div className="h-fit w-full px-16 flex justify-center mb-3">
      <p className="w-fit bg-white dark:bg-gray-900 text-xs text-center rounded-lg font-normal px-4 py-1">
        <ClockFading className="inline" /> {roomMessage}
      </p>
    </div>
  );
};

export default RoomMessageCard;
