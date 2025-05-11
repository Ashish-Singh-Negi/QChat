import React from "react";

const RoomMessageCard = ({ message }: { message: string }) => {
  return (
    <>
      <div className="h-fit w-full px-10 flex justify-center ">
        <p className="w-fit bg-gray-800 text-xs text-center rounded-xl font-medium px-2 py-[2px] my-1">
          {message}
        </p>
      </div>
    </>
  );
};

export default RoomMessageCard;
