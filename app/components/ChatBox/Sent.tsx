import React, { useState } from "react";
import { IMessage } from "../../Interface/message";
import List from "./List";
import "../../global.css";
import { context_val } from "@/app/chatsSection/ContextProvider";
import { Checked, Star, UnChecked } from "@/app/icons";
import EmojiPicker from "emoji-picker-react";

function Sent(data: { css: string; message: IMessage }) {
  const { sent_Text, setSent_Text, checked } = context_val();
  const [reacting, setReacting] = useState(false);
  const [boxChecked, setBoxChecked] = useState(false);
  const [stared, setStared] = useState(false);
  const [reaction, setReaction] = useState("");
  const handleReaction = (e: {
    activeSkinTone: string;
    emoji: string;
    imageUrl: string;
    isCustom: boolean;
    names: string[];
    unified: string;
    unifiedWithoutSkinTone: string;
  }) => {
    console.log(e.emoji);
    setReaction(e.emoji);

    setReacting(false);
  };

  return (
    <div
      className={` w-full flex ${
        checked ? ` justify-between  ` : `justify-end   `
      } `}
    >
      {checked && (
        <button
          className=" ml-4 flex self-start text-2xl  my-2 txt-color-lvl-1 text-quick-600"
          onClick={() => setBoxChecked(!boxChecked)}
        >
          {boxChecked ? <Checked /> : <UnChecked />}
        </button>
      )}
      <div className={` justify-end  max-w-[75%]  `}>
        <div
          onDoubleClick={() => setSent_Text(!sent_Text)}
          className="shadow-lg  color-lvl-2 px-2 py-1 mx-3 mt-1 rounded-xl "
        >
          <div className="relative">
            {reaction != "" && (
              <div className="absolute left-0 top-9 h-fit w-fit p-[2px] color-lvl-1 rounded-full ">
                {reaction}
              </div>
            )}
            <p className="txt-color-lvl-4 text-quick-500">
              {" "}
              {data.message.message}
            </p>
            <div className="flex justify-end">
              {!stared && <Star className=" mr-1 txt-color-lvl-1 size-3" />}

              <p className="txt-color-lvl-1 text-quick-500 text-right text-[0.6rem] p-0  ">
                {data.message.date}
              </p>
            </div>
          </div>
        </div>
        {sent_Text && (
          <div className="absolute right-8 top-5">
            <List
              stared={stared}
              setStared={setStared}
              setReacting={setReacting}
              text={data.message.message}
            />
          </div>
        )}
      </div>
      {reacting && (
        <div className="absolute ">
          <EmojiPicker onEmojiClick={handleReaction} />
        </div>
      )}
    </div>
  );
}

export default Sent;
