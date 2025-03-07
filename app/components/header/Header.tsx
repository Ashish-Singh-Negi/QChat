"use client";
import "../../global.css";
import React from "react";
import Image from "next/image";
import cat from "../../images/cat.avif";
import { Search, Three_dot } from "@/app/icons";
import { context_val } from "@/app/chatsSection/ContextProvider";

function Header(data :{css :string}) {
  const {threeDot_btn ,  setContactInfo , search  , setSearch, setThreeDot_btn} = context_val();
  
  return (
    <div className={`div-center absolute top-0 right-0 z-100 p-2  justify-between header-height ${data.css}  color-lvl-1  `}>
      <div className=" h-full w-full flex flex-row justify-between  content-center">
        <div className=" flex w-[60vw] h-full  content-center">
          <div className="avatar self-center">
            <div className="w-12 h-12 rounded-full mx-2">
              <Image height={100} width={100} src={cat} alt={""} />
            </div>
          </div>
          <div onClick={()=>setContactInfo(true)} className="self-center  text-quick-400   txt-color-lvl-4 text-xl">
            boss
          </div>
        </div>

        <div className="h-full w-[12vw] flex justify-around ">
          <button onClick={()=>setSearch(!search)} className="self-center p-0 txt-color-lvl-3 text-2xl">
            <Search className="self-center mt-2" />
          </button>
          <button onClick={()=>setThreeDot_btn(!threeDot_btn)} className="self-center p-0  txt-color-lvl-3 text-2xl">
            <Three_dot onClick={()=>setThreeDot_btn(!threeDot_btn)} className="self-center mt-2" />
          </button>
        </div>
    
      </div>
    </div>
  );
}

export default Header;
