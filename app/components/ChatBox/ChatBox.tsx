import React from "react";
import Sent from "@/app/components/ChatBox/Sent";
import { IMessage } from "@/app/Interface/message";
import DeleteMessage from "../DeleteMessage";
import Recieved from "../../components/ChatBox/Recieved";
import "../style.css";
import { context_val } from "@/app/chatsSection/ContextProvider";

function ChatBox(data: { css: string }) {
  const { setThreeDot_btn, setRecieve_Text, setSent_Text, visibility } =
    context_val();

  const data1: IMessage = {
    senderID: "me",
    recieverID: "notme",
    message: "hello  hello",
    date: "1:45",
  };

  const data2: IMessage = {
    senderID: "me ",
    recieverID: "notme",
    message: "hello , kjfjejegjsjd sjdhjsdj jhsdjah hyd",
    date: "2:23",
  };

  return (
    <div className="">
      <div
        onClick={() => {
          setRecieve_Text(false);
          setSent_Text(false);
          setThreeDot_btn(false);
        }}
        className=" overflow-scroll overflow-y-hidden absolute z-[-1] flex flex-col  color-lvl-3 h-[90vh] top-[64px] left-0"
      >
        <div className="h-10 w-fit px-3 py-2 color-lvl-1 self-center rounded-3xl text-quick-400 mt-1 ">
          {" "}
          today{" "}
        </div>
        <Sent message={data1} css={data.css} />

        <Recieved message={data2} css={data.css} />
      </div>
      {visibility && (
        <div>
          <DeleteMessage />
        </div>
      )}
    </div>
  );
}

export default ChatBox;
