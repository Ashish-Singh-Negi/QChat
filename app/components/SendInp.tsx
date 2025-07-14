"use client";

import { Send, Microphone, Add, Emogi } from "../icons";
import React, { FormEvent, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "../global.css";
import "./style.css";
import { IMessage } from "../Interface/message";
import SendOptions from "./SendOptions";
import { context_val } from "../chatsSection/ContextProvider";
import Reply from "./Reply";
function SendInp(data: { css: string }) {
  const [fileBtn, setFileBtn] = useState(false);
  const [emogiBtn, setEmogiBtn] = useState(false);
  const { replying } = context_val();

  const [text, setText] = useState("");
  const data1: IMessage = {
    senderID: "me",
    recieverID: "notme",
    message: "hello  hello",
    date: "01-01-2025",
    // phone_No: 2673567,
  };
  const onEmojiClick = (emojiData: {
    activeSkinTone: string;
    emoji: string;
    imageUrl: string;
    isCustom: boolean;
    names: string[];
    unified: string;
    unifiedWithoutSkinTone: string;
  }) => {
    setText((prevText) => prevText + emojiData.emoji);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 z-[-1] f;ex  overflow-visible h-fit "
    >
      {replying && <Reply message={data1} />}
      {emogiBtn && (
        <div className="fixed bottom-[64px]">
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </div>
      )}
      <div className={`${data.css}`}>
        <div className="color-lvl-1 w-full flex p-1">
          <div className="flex justify-around w-[120px] mr-2">
            <button
              onClick={() => {
                setFileBtn(!fileBtn);
              }}
              className={` rounded-full h-fit w-fit p-2 mt-1 outline-none txt-color-lvl-2 text-3xl font-medium ${
                fileBtn && "add_Btn_Animation shadow-xl bg-black bg-opacity-20"
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
              <button type="submit" className="txt-color-lvl-2 text-2xl ">
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
      <div className="fixed bottom-[5%] left-[30%] z-100">
        <SendOptions visible={fileBtn} />
      </div>
    </form>
  );
}

export default SendInp;
