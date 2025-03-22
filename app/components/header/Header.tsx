"use client";
import "../../global.css";
import React, { useState } from "react";
import Image from "next/image";
import cat from "../../images/cat.avif";
import { Pin, Search, Three_dot } from "@/app/icons";
import ThreeList from "./ThreeList";
import { context_val } from "@/app/chatsSection/ContextProvider";
import PinedMessages from "../ChatBox/PinedMessages";

function Header(data: { css: string }) {
  const { threeDot_btn, setContactInfo, search, setSearch, setThreeDot_btn } =
    context_val();
  const [online, setOnline] = useState(false);
  const [pinned, setPinned] = useState(false);
  return (
    <div
      className={`div-center  flex flex-col absolute z-[0] top-0 right-0  p-2  justify-between h-fit ${data.css}  color-lvl-1  `}
    >
      {threeDot_btn && (
        <div className="absolute z-50 right-4 top-[60px]">
          <ThreeList />
        </div>
      )}
      <div className=" h-full w-full flex flex-row justify-between  content-center">
        <div className=" flex w-[60vw] h-full  content-center">
          <div className="avatar self-center">
            <div className="w-12 h-12 rounded-full mx-2">
              <Image height={100} width={100} src={cat} alt={""} />
            </div>
          </div>
          <div
            onClick={() => setContactInfo(true)}
            className="self-center  text-quick-400   txt-color-lvl-4 text-xl"
          >
            boss
            <div className="text-xs text-quick-400">
              {online ? "online" : "last seen : 1am"}
            </div>
          </div>
        </div>

        <div className="h-full w-[16vw] flex justify-around ">
          <button
            onClick={() => setPinned(!pinned)}
            className="self-center p-0 txt-color-lvl-3 text-2xl"
          >
            <Pin className="self-center mt-2" />
          </button>
          <button
            onClick={() => setSearch(!search)}
            className="self-center p-0 txt-color-lvl-3 text-2xl"
          >
            <Search className="self-center mt-2" />
          </button>
          <button
            onClick={() => setThreeDot_btn(!threeDot_btn)}
            className="self-center p-0  txt-color-lvl-3 text-2xl"
          >
            <Three_dot className="self-center mt-2" />
          </button>
        </div>
      </div>

      <div className={` ${pinned ? "flex" : "hidden"} w-full h-fit `}>
        <PinedMessages />
      </div>
    </div>
  );
}

export default Header;
