import React, { useState } from "react";
import "../../global.css";
import "../style.css";
import { useRouter } from "next/navigation";
import { context_val } from "@/app/chatsSection/ContextProvider";
function ThreeList() {
  const {
    contactInfo,
    setContactInfo,
    setDisappearingComp,
    disappearingComp,
    checked,
    mutePopUp ,
    setChecked,
    setMutePopUp,
    clearChatPopUp,
    setClearChatPopUp,
    deletePopUp,
    setBlockPopUp,
    setDeletePopUp,
    blockPopUp,
    setThreeDot_btn,
    threeDot_btn,
  } = context_val();
  const [removeFav, setRemoveFav] = useState(false);
  const navigate = useRouter();
  const Changing = (setFuction: (val: boolean) => void, val: boolean) => {
    setFuction(!val);
    setThreeDot_btn(!threeDot_btn);
  };
  return (
    <div className=" rounded-xl  shadow-2xl  Three-dot-list     color-lvl-3      p-4  bg-white">
      <li
        onClick={() => Changing(setContactInfo, contactInfo)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1"
      >
        Contact info
      </li>
      <li
        onClick={() => Changing(setChecked, checked)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Select messages
      </li>
      <li
        onClick={() => Changing(setMutePopUp, mutePopUp)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Mute Notification
      </li>
      <li
        onClick={() => Changing(setDisappearingComp, disappearingComp)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Disapearing message
      </li>
      <li
        onClick={() => Changing(setRemoveFav, removeFav)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        {!removeFav ? "add to " : "remove from "}favorites
      </li>   
      <li
        onClick={() => navigate.push("/chatsSection/person/notSelected")}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Close Chat
      </li>
      <li
        onClick={() => Changing(setDeletePopUp, deletePopUp)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Delete chat
      </li>
      <li
        onClick={() => Changing(setBlockPopUp, blockPopUp)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Block user
      </li>
      <li
        onClick={() => Changing(setClearChatPopUp, clearChatPopUp)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Clear Chat
      </li>
    </div>
  );
}

export default ThreeList;
