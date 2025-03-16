"use client";
import React, { useState } from "react";
import List from "./List";
import "../style.css";
import { IMessage } from "../../Inteface/message";
import { context_val } from "@/app/chatsSection/ContextProvider";
import { Checked, UnChecked } from "@/app/icons";
function Recieved(data: { css: string; message: IMessage }) {
  const { recieve_Text, setRecieve_Text, checked } = context_val();
  const [boxChecked, setBoxChecked] = useState(false);
  return (
    <div className={` flex justify-start  ${data.css} `}>
      {checked && (
        <button
          className=" ml-4 text-2xl my-2 txt-color-lvl-3 text-quick-600"
          onClick={() => setBoxChecked(!boxChecked)}
        >
          {boxChecked ? <Checked /> : <UnChecked />}
        </button>
      )}
      <div
        onDoubleClick={() => setRecieve_Text(!recieve_Text)}
        className="  w-fit color-lvl-3 shadow-lg px-2 py-1 mx-3 mt-1 rounded-xl "
      >
        <p className="txt-color-lvl-1 text-quick-600">
          {" "}
          {data.message.message}
        </p>
        <p className="txt-color-lvl-4 text-quick-400 text-opacity-5 text-right text-[0.6rem] p-0  ">
          {data.message.date}
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
