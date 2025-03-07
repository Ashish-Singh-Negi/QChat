"use client";

import PersonMd from "./PersonMd";
import PersonLg from "./PersonLg";
import ContextProvider from "../ContextProvider";
import "../../global.css";
function page() {
  return (
    <>
      <ContextProvider>
        <div className=" global-width fixed right-0">
        <PersonMd />
        <PersonLg />
        </div>
      
      </ContextProvider>
    </>
  );
}

export default page;
