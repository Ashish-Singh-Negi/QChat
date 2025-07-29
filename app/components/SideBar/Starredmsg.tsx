import React, { useState } from "react";
import Image from "next/image";
import Sent from "../ChatBox/Sent";
import Cat from "../../images/kitkit.jpeg";
import { Down, ARight } from "@/app/icons";
import Recieved from "../ChatBox/Recieved";
import { IMessage } from "@/Interface/message";

function Starredmsg() {
  const [recieved] = useState(false);
  const data1: IMessage = {
    senderID: "me",
    recieverID: "notme",
    message: "hello  hello",
    date: "1:45",
    // phone_No: 2673567,
  };
  return (
    <div className="flex flex-col  relative hover:bg-slate-50 hover:bg-opacity-20 pb-1 ">
      <div className="flex">
        <div className="rounded-full h-[50px] w-[50px] overflow-hidden bg-cover">
          <Image height={100} width={100} src={Cat} alt="img" />
        </div>
        <div className="flex justify-between w-[90%]">
          <div className="flex items-center ml-2 text-quick-400  ">
            Kit <ARight className="text-xs mx-1" /> You
          </div>
          <div className="flex items-center text-sm text-quick-500">
            3/4/2025 <Down className="-rotate-90 mx-2" />{" "}
          </div>
        </div>
      </div>
      <div className=" mr-3 ">
        {recieved ? (
          <Recieved css="" message={data1} />
        ) : (
          <Sent css="" message={data1} />
        )}
      </div>
    </div>
  );
}

export default Starredmsg;
