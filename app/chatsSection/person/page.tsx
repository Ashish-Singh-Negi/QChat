"use client";

import "../../global.css";
import "../../globals.css";

import PersonMd from "./PersonMd";
import PersonLg from "./PersonLg";
import Sidebar from "@/app/components/SideBar/Sidebar";
import Box from "@/app/components/SideBar/Box";
import ContextProvider from "../ContextProvider";

function Person() {
  return (
    <ContextProvider>
      <div className="fixed z-0 left-0">
        <Sidebar />
      </div>
      <div>
        <Box />
      </div>
      <div className=" global-width fixed right-0">
        <PersonMd />
        <PersonLg />
      </div>
    </ContextProvider>
  );
}

export default Person;
