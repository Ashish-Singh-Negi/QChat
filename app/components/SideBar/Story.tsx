import { ALeft , Three_dot } from "@/app/icons";
import React, { useState } from "react";
import Image from "next/image";
import Cat from "../../images/kitkit.jpeg";
import "./Style.css"
import { context_val } from "@/app/chatsSection/ContextProvider";
import StroryOthers from "./StroryOthers";
function Story() {
  const { story, setStory , storySetting , setStorySetting } = context_val();
  const [list , setList] = useState(false);
 
  return (
    <div
      className={` ${
        story ? "flex" : "hidden"
      } flex-col  sideBar_width color-lvl-1 h-[100vh] absolute z-[-1] left_l`}
    >
      <div>
        <div className="flex w-full px-2 items-center  justify-between text-quick-600 text-2xl h-[60px]">
          {" "}
          
          
          Status{" "}
         
          <Three_dot  onClick={()=>setList(!list)}/>
          {list && <div onClick={()=>setStorySetting(true)} className="absolute top-3 right-9 list-border list-none text-sm text-quick-400 hover:bg-slate-100 hover:bg-opacity-35 p-2 rounded-md hover:txt-color-lvl-1">
            <li >Status settings</li>
            </div>}
        </div>
        <div onClick={()=>setList(false)} className="flex  items-center h-[80px] mx-1 ">
          {" "}
          <div className="h-[60px] w-[60px] overflow-hidden rounded-full">
            <Image height={100} width={100} src={Cat} alt="your_pfp" />
          </div>
          <div className=" ml-1">
            <h2 className="text-quick-500">My status</h2>
            <p className="text-quick-400 text-sm text-gray-500">
              click to add status update
            </p>
          </div>
        </div>
      </div>
      <div  className="divider h-4 siderBar_width  m-0 p-0 "></div>
      <div onClick={()=>setList(false)} >
        <h2 className="text-quick-600  border-b-2 border-slate-400 border-opacity-20 pb-3  pl-5 mb-3 txt-color-lvl-3">VIEWED</h2>
        <div className="flex flex-col overflow-scroll h-[70vh] overflow-x-hidden scroll-m-0 scroll-auto ">
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
       <StroryOthers />
        </div>
    
      </div>
    </div>
  );
}

export default Story;
