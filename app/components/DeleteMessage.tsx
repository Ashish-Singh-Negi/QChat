import React from "react";
import "../globals.css";
import { context_val } from "../chatsSection/ContextProvider";

function DeleteMessage() {
  const { setVisibility } = context_val();

  return (
    <div
      className={`flex fixed right-0 h-[100vh] global-width  justify-center bg-opacity-80 content-center items-center  bg-black `}
    >
      <div className=" rounded-xl  top-[30%] left-[20%]  w-[400px] color-lvl-1 p-5 ">
        <h2 className="text-quick-600 text-2xl mb-4 txt-color-lvl-3 ">
          Delete Message..?
        </h2>

        <div className="flex flex-col ">
          <div className="flex pt-2 content-center items-center  ">
            <input className=" size-4 mr-3" type="radio" name="mute" />
            <div className="text-quick-400 text-lg txt-color-lvl-4">
              Delete for everyone
            </div>
          </div>
          <div className="flex pt-2 content-center items-center ">
            <input className=" size-4 mr-3" type="radio" name="mute" />
            <div className="text-quick-400 text-lg  txt-color-lvl-4">
              Delete for me
            </div>
          </div>
          <div className="flex pt-2 pb-4 content-center items-center">
            <input
              onClick={() => setVisibility(false)}
              className=" size-4 mr-3"
              type="radio"
              name="mute"
            />
            <div
              onClick={() => setVisibility(false)}
              className="text-quick-400 text-lg  txt-color-lvl-4"
            >
              cancel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteMessage;
