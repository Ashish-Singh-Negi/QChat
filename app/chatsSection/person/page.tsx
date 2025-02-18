"use client";
import React from "react";
import Header from "../../components/header/Header";
import ChatBox from "@/app/components/ChatBox/ChatBox";
import SendInp from "../../components/SendInp";
import ContextProvider from "../ContextProvider"
function page() {
  return (
    <ContextProvider >

    <div className="flex flex-col ">
      <div className="fixed  right-0">
        <Header />
      </div>
      <div className="flex flex-col">
        <ChatBox />
        <SendInp />
      </div>
      
    </div>
    </ContextProvider>
  );
}

export default page;
