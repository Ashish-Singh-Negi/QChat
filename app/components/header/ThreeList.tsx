import React , {useEffect, useState} from "react";
import "../../global.css";
import "../style.css";
import { useRouter } from "next/navigation";
import { context_val } from "@/app/chatsSection/ContextProvider";
function ThreeList() {
  const { contactInfo, setContactInfo,setDisappearingComp , checked, setChecked , setMutePopUp  , clearChatPopUp , setClearChatPopUp ,  deletePopUp , setBlockPopUp  , setDeletePopUp , blockPopUp} = context_val();
  const [removeFav , setRemoveFav] = useState(false);
  const navigate = useRouter();
  useEffect(()=>{
 console.log(removeFav)
  },[removeFav])
  return (
    <div className=" rounded-xl fixed shadow-2xl Three-dot-list right-4  top-[60px] color-lvl-3   p-4 z-10 bg-white">
      <li
        onClick={() => setContactInfo(!contactInfo)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1"
      >
        Contact info
      </li>
      <li
        onClick={() => setChecked(!checked)}
        className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1"
      >
        Select messages
      </li>
      <li
      onClick={()=>setMutePopUp(true)}
       className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Mute Notification
      </li>
      <li 
      onClick={()=>setDisappearingComp(true)}
      className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Disapearing message
      </li>
      <li
      onClick={()=>setRemoveFav(!removeFav)}
       className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
       {!removeFav ? "add to " :  "remove from "}favorites
      </li>
      <li 
      onClick={()=>navigate.push("/chatsSection/person/notSelected")}
      className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Close Chat
      </li>
      <li 
      onClick={()=>setDeletePopUp(!deletePopUp)}
      className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Delete chat
      </li>
      <li 
      onClick={()=>setBlockPopUp(!blockPopUp)}
      className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Block user
      </li>
      <li 
      onClick={()=>setClearChatPopUp(!clearChatPopUp)}
      className="list-none text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1">
        Clear Chat
      </li>
    </div>
  );
}

export default ThreeList;
