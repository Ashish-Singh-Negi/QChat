import React from "react";
import { IMessage } from "../../Interface/message";
import { Cross } from "../icons";
import "../global.css"
import { context_val } from "../chatsSection/ContextProvider";
function Reply(data: { message: IMessage }) {
const {setReplying}  = context_val();
    
  return (
    <div className="global-width flex pl-[12vw] color-lvl-1 ">
      <div className="text-left  w-fit p-2 border-l-4 rounded-lg  border-green-900 align-middle" >
        <h2 className="txt-color-lvl-3 text-quick-500">{data.message.senderID}</h2>
        <p className="text-quick-400">{data.message.message}</p>
      </div>
      <button className="flex h-fit absolute right-8 top-4 text-3xl txt-color-lvl-3 "  onClick={()=>setReplying(false)}>
        <Cross />
      </button>
    </div>
  );
}

export default Reply;
