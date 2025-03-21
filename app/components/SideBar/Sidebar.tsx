import React from "react";
import Cat from "../../images/kitkit.jpeg";
import Image from "next/image";
import "../../global.css"
import { Chats, Setting, Story } from "../../icons";
import { context_val } from "@/app/chatsSection/ContextProvider";
function Sidebar() {
  const {  setShow,  setStory,  setProfile , setSettings } = context_val();
  return (
    <div className="h-[100vh] sB_w flex flex-col justify-between lg:w-[5vw] color-lvl-1  border-r-2 mr-[3px] border-slate-50  border-opacity-5">
      <div className="flex flex-col  justify-start content-center items-center">
        <button
          onClick={() => setShow(true)}
          className="text-xl txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center"
        >
          <Chats />
        </button>
        <button
          onClick={() => setStory(true)}
          className="text-xl txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center"
        >
          <Story />
        </button>
      </div>
      <div className="flex flex-col  mb-6 items-center ">
        <button onClick={()=>setSettings(true)} className="text-xl mb-2 txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center">
          <Setting />
        </button>
        <button onClick={()=>setProfile(true)} className=" size-9  hover:bg-slate-50 hover:bg-opacity-15 rounded-full  overflow-hidden   text-center">
          <Image src={Cat} height={100} width={100} alt="pfp" />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
