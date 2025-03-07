"use client";
import { Send, Microphone, Add, Emogi } from "../icons";
import React, { useEffect, useState } from "react";
import "../global.css";
import "./style.css";
function SendInp(data:{css :string}) {
  const [fileBtn, setFileBtn] = useState(false);
  const [emogiBtn, setEmogiBtn] = useState(false);
  useEffect(() => {
    console.log(fileBtn);
  }, [fileBtn]);
  const [text, setText] = useState("");
  return (
    <div className={` fixed bottom-0 z-100  ${data.css}`}>
      <div className="color-lvl-1 w-full flex p-1">
        <div className="flex justify-around w-[120px] mr-2">
          <button
            onClick={() => setFileBtn(!fileBtn)}
            className={` rounded-full h-fit w-fit p-2 mt-1 outline-none txt-color-lvl-2 text-3xl font-medium ${
              fileBtn && " add_Btn_Animation shadow-xl bg-black bg-opacity-20"
            }`}
          >
            <Add />
          </button>
          <button
            onClick={() => setEmogiBtn(!emogiBtn)}
            className={` ${
              emogiBtn ? "txt-color-lvl-4" : "txt-color-lvl-2"
            }  text-xl`}
          >
            <Emogi />
          </button>
        </div>
        <div className="  flex w-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="color-lvl-3 w-full h-[50px] text-quick-600 text-lg pl-2 txt-color-lvl-1 outline-none rounded-lg "
            type="text"
            name="send"
            id=""
          />
        </div>
        <div className="flex justify-around w-[120px]">
          {text != "" ? (
            <button className="txt-color-lvl-2 text-2xl ">
              <Send />
            </button>
          ) : (
            <button className="txt-color-lvl-2 text-2xl">
              <Microphone />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SendInp;
