import React from "react";
import Sent from "@/app/components/ChatBox/Sent";
import ThreeList from "../header/ThreeList";
import { IMessage } from "@/app/Inteface/message";
import Recieved from "../../components/ChatBox/Recieved";
import "../style.css"
import { context_val } from "@/app/chatsSection/ContextProvider";
function ChatBox() {
  const {threeDot_btn , setRecieve_Text , setSent_Text } = context_val();
  const data: IMessage = {
    senderID: "me",
    recieverID: "notme",
    message: "hello  hello",
    date: "01-01-2025",
    phone_No: 2673567,
  };

  const data1: IMessage = {
    senderID: "me",
    recieverID: "notme",
    message: "hello , hyd",
    date: "01-01-2025",
    phone_No: 2673567,
  };
  return (
    <div>
      <div
      onClick={()=>{
        setRecieve_Text(false);
        setSent_Text(false)
      }}
        className=" overflow-scroll overflow-y-hidden fixed z-0 flex flex-col 
      color-lvl-3-op h-[90vh]    top-[64px] right-0"
      >
        <Sent {...data} />

        <Recieved {...data1} />
        {threeDot_btn && (
          <div className="fixed  z-100 right-4 top-[60px]">
            <ThreeList  />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBox;
