"use client";

import PersonMd from "./PersonMd";
import PersonLg from "./PersonLg";
import ContextProvider from "../ContextProvider";
import Sidebar from "@/app/components/SideBar/Sidebar";
import "../../global.css";
import "../../globals.css"
import Box from "@/app/components/SideBar/Box";
function page() {
  return (
    <>
      <ContextProvider>
        <div className="fixed z-0 left-0">

        <Sidebar />
        </div>
        <div>
      <Box/>
        </div>
      
        <div className=" global-width fixed right-0">
          <PersonMd />
          <PersonLg />
        </div>
       
      </ContextProvider>
    </>
  );
}

export default page;
