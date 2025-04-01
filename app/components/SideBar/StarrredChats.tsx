import { context_val } from "@/app/chatsSection/ContextProvider";
import { ALeft, Three_dot } from "@/app/icons";
import "../../global.css";
import React from "react";
import Starredmsg from "./Starredmsg";

function StarrredChats() {
  const { side_starredMessage , setSide_starredMessages } = context_val();
  return (
    <div
      className={`${
        side_starredMessage ? "flex" : "hidden"
      } flex-col h-[100vh] sideBar_width color-lvl-1 absolute z-[100] left-[6vw]`}
    >
      <div className="flex w-full h-[60px] justify-between items-center">
     <div className="flex content-center text-quick-500 justify-between items-center w-[45%]">
     <ALeft onClick={()=>setSide_starredMessages(false)} className="ml-1 txt-color-lvl-3 " /> Starred Message
      </div>  
         <Three_dot />
      </div>
      <div>
        <Starredmsg />
        <Starredmsg />
        <Starredmsg />
        <Starredmsg />
      </div>
    </div>
  );
}

export default StarrredChats;
