"use client";
import React from "react";
import { context_val } from "../chatsSection/ContextProvider";

function PopUp(data: { message: string; btn2: string; header: string }) {
  const { header, message, btn2 } = data;
  const { setBlockPopUp, setClearChatPopUp, setDeletePopUp } = context_val();

  const closePopUP = () => {
    setBlockPopUp(false);
    setClearChatPopUp(false);
    setDeletePopUp(false);
  };

  return (
    <div
      className={` flex  fixed left-0 h-[100vh] w-[100vw] justify-center bg-opacity-80 content-center items-center  bg-black `}
    >
      <div className=" rounded-xl  top-[30%] left-[20%]  w-[500px] color-lvl-1 p-5 ">
        <h2 className="text-quick-600 text-2xl mb-4 txt-color-lvl-3 ">
          {header}
        </h2>

        <p className="text-quick-400 text-lg mb-4 ">{message}</p>

        <div className=" flex justify-end">
          <button
            onClick={closePopUP}
            className="p-2 txt-color-lvl-2 color-lvl-4 rounded-3xl mx-3 hover:bg-transparent border-transparent hover:text-white hover:border-white border-[2px]  text-quick-500 "
          >
            Cancel
          </button>
          <button className="p-2 color-lvl-2 rounded-2xl hover:bg-transparent hover:text-white border-transparent hover:border-white border-[2px] mx-3  text-quick-400 ">
            {btn2}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
