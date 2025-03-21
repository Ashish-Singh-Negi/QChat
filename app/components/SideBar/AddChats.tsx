import React from "react";
import Contacts from "./Contacts";
import Cat from "../../images/kitkit.jpeg";
import { context_val } from "@/app/chatsSection/ContextProvider";
import { ALeft } from "@/app/icons";
import SearchBarChats from "./SearchBarChats";
function AddChats() {
  const { addChats  , setAddChats} = context_val();

  return (
    <div
      className={`${
        addChats ? "flex" : "hidden"
      }   h-[100vh] flex-col sideBar_width color-lvl-1 absolute z-1 left-[6.5vh]  `}
    >
      <div className="h-[64px] w-full color-lvl-1 flex items-center text-quick-600 pl-2  ">
       <ALeft onClick={()=>setAddChats(false)} className=" txt-color-lvl-2 mr-3" /> Add Chats
      </div>
      <div className="color-lvl-1 pb-2">
      <SearchBarChats />
       </div>
      <Contacts pfp={Cat} name="rakhi" text="" lastText="" />
    </div>
  );
}

export default AddChats;
