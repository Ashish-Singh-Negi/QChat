"use client";
import React from "react";
import List from "./List";
import "../style.css";

import { IMessage } from "../../Inteface/message";
import { context_val } from "@/app/chatsSection/ContextProvider";

function Recieved(message: IMessage) {
  const { recieve_Text, setRecieve_Text } = context_val();
  return (
    <div className="w-[70vw] justify-star relative  ">
      <div
        onDoubleClick={() => setRecieve_Text(!recieve_Text)}
        className="  w-fit color-lvl-3 shadow-lg px-2 py-1 mx-3 mt-1 rounded-xl "
      >
        <p className="txt-color-lvl-1 text-quick-600"> {message.message}</p>
        <p className="txt-color-lvl-4 text-quick-400 text-opacity-5 text-right text-[0.6rem] p-0  ">
          {message.date}
        </p>
      </div>
      {recieve_Text && (
        <div className="absolute left-8 top-5">
          <List />
        </div>
      )}
    </div>
  );
}

export default Recieved;
