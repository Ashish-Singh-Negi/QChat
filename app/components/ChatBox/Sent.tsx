import React from "react";
import { IMessage } from "../../Inteface/message";
import List from "./List";
import "../../globals.css";
import { context_val } from "@/app/chatsSection/ContextProvider";

function Sent(message: IMessage) {
  const { sent_Text, setSent_Text } = context_val();
  return (
    <div className="flex justify-end relative  ">
      <div
        onDoubleClick={() => setSent_Text(!sent_Text)}
        className=" shadow-lg w-fit color-lvl-2 px-2 py-1 mx-3 mt-1 rounded-xl "
      >
        <p className="txt-color-lvl-4 text-quick-500"> {message.message}</p>
        <p className="txt-color-lvl-1 text-quick-500 text-right text-[0.6rem] p-0  ">
          {message.date}
        </p>
      </div>
      {sent_Text && (
        <div className="absolute right-8 top-5">
          <List />
        </div>
      )}
    </div>
  );
}

export default Sent;
