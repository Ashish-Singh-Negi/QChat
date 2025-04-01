import React from "react";
import Header from "../../components/header/Header";
import ChatBox from "@/app/components/ChatBox/ChatBox";
import SendInp from "../../components/SendInp";
import { context_val } from "../ContextProvider";
import CheckedOptions from "@/app/components/CheckedOptions";
import MuteNotification from "@/app/components/header/MuteNotification";
import PopUp from "@/app/components/PopUp";

function Chat(data: { css: string }) {
  const {
    checked,
    mutePopUp,
    blockPopUp,
    deletePopUp,
    clearChatPopUp,
    selectChats,
  } = context_val();

  return (
    <div
      className={` ${selectChats ? "flex" : "hidden"}  flex-col ${data.css} `}
    >
      <div className="">
        <Header css={data.css} />
      </div>
      <div className="flex flex-col">
        <ChatBox css={data.css} />
        {!checked ? (
          <SendInp css={data.css} />
        ) : (
          <CheckedOptions css={data.css} selected_texts={0} />
        )}
      </div>
      {mutePopUp && <MuteNotification />}
      {blockPopUp && (
        <PopUp
          message="This person won't be able to message or call you ,They won't know you blocked them."
          btn2="block chat"
          header="Block this chat?"
        />
      )}
      {deletePopUp && (
        <PopUp message="" btn2="delete chat" header="Delete this chat?" />
      )}
      {clearChatPopUp && (
        <PopUp
          message="This chat will be empty but will remain in your chat list ."
          btn2="clear chat"
          header="Clear this chat?"
        />
      )}
    </div>
  );
}

export default Chat;
