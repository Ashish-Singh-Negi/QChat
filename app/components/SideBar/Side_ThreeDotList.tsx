import React from "react";
import { context_val } from "@/app/chatsSection/ContextProvider";
import "./Style.css";
function Side_ThreeDotList() {
  const {
    side_starredMessage,
    setSide_starredMessages,
    logOut ,setLogOut
  } = context_val();

  

  return (
    <div className=" rounded-xl  shadow-2xl  side_Three-dot-list   top-[60px]  color-lvl-3   p-4 z-10 bg-white">
       

      <li
        onClick={() => setSide_starredMessages(!side_starredMessage)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Starred messages
      </li>
      <li
        onClick={()=>setLogOut(!logOut)}
        className="list-none text-red-900  text-opacity-60  text-quick-700 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Log Out
      </li>
    </div>
  );
}

export default Side_ThreeDotList;
