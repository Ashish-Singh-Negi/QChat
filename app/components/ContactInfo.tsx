import React from "react";
import { context_val } from "../chatsSection/ContextProvider";
import cat from "../images/kitkit.jpeg";
import Image from "next/image";
import "../global.css";
import { ARight, Cross, Star, Trash } from "../icons";
function ContactInfo(data :{css :string}) {
  const { contactInfo, setContactInfo } = context_val();
  const obj = {
    name: "Kit",
  };
  return (
    <div
      className={` ${
        contactInfo ? "flex" : "hidden"
      } flex-col pt-[310px]  h-[100vh] overflow-scroll justify-center content-center text-center  ${data.css} absolute z-[0] bg-black  right-0  `}
    >
      <div className="flex  w-full fixed top-0 justify-start content-center items-center h-[64px] color-lvl-1   ">
        <button
          onClick={() => setContactInfo(false)}
          className=" text-3xl mx-2 txt-color-lvl-2 text-quick-600 "
        >
          <Cross />
        </button>
        <h2 className=" ml-4 text-2xl my-2 txt-color-lvl-3 text-quick-600">
          ContactInfo
        </h2>
      </div>
      {/* ..........pfp.......... */}
      <div className="flex flex-col justify-center color-lvl-1 m-4 p-2  rounded-2xl ">
        <div className="rounded-full overflow-hidden self-center flex w-[40vh]  h-[40vh] justify-center content-center">
          <Image
            className="h-[40vh] w-full rounded-full "
            src={cat}
            alt="profie pic"
          />
        </div>
        <div className=" text-2xl my-2 txt-color-lvl-2 text-quick-600">
          {obj.name}
        </div>
      </div>
      {/* about */}
      <div className="flex flex-col justify-center items-start  color-lvl-1 m-4 p-2  rounded-2xl ">
        <h3 className=" text-xl txt-color-lvl-2 text-quick-500 mx-4 ">
          About :
        </h3>
        <p className=" text-lg txt-color-lvl-3_5 text-quick-500 m-2 ml-4">hello</p>
      </div>
      {/* ..................media,link........... */}
      <div className="flex flex-col justify-around items-start  color-lvl-1 m-4 p-2  rounded-2xl  ">
        <div className="flex justify-center self-start items-start h-[4rem] w-[100%] ">
          <h3 className="text-lg txt-color-lvl-2 text-left text-quick-500 w-[80%] mx-4 p-2">
            Media , links and docs{" "}
          </h3>
          <div className="flex  p-2 w-[20%]">
            <p className=" text-md txt-color-lvl-2 text-quick-600 ">157 </p>
            <button className=" text-lg txt-color-lvl-2 text-quick-600 ">
              <ARight />
            </button>
          </div>
        </div>
        <div className="text-lg txt-color-lvl-3_5 text-quick-600 mt-0 px-2 m-4">
          ...
        </div>
      </div>
      {/* ..........chat settings......... */}
      <div>
        <div className="text-lg txt-color-lvl-3 color-lvl-1 rounded-2xl py-4 text-quick-600 mt-0 px-2 m-4">
          <li className=" list-none  flex content-center  items-center">
            {" "}
            <Star className="mx-8" />
            <span className="w-[90%] text-left">starred messages</span>{" "}
            <ARight className="mx-8" />{" "}
          </li>
        </div>
      </div>
      {/* common in grps......... */}
      <div className=" flex flex-col justify-start content-center items-start  txt-color-lvl-3_5 color-lvl-1 rounded-2xl py-4   mt-0 px-2 m-4">
        <h4 className="text-lg txt-color-lvl-2 text-quick-600 mt-0 px-2 m-4">
          1 group in common
        </h4>
        <div>
          <p className="txt-color-lvl-3 text-md text-quick-600 ml-6">
            group abc
          </p>
        </div>
      </div>
      {/* .......additional settings......... */}
      <div className="text-lg txt-color-lvl-3_5 color-lvl-1 rounded-2xl py-4 text-quick-600 mt-0 px-2 m-4">
        <h2 className="text-red-500 flex ">
          {" "}
          <Trash className="self-center mx-8" />
          delete chat
        </h2>
      </div>
    </div>
  );
}

export default ContactInfo;
