import React, { useState } from "react";
import Image from "next/image";
import { Down } from "@/app/icons";
import './Style.css'
function Contacts(data : {pfp : string , name :string , texts : number ,  lastText : string}) {

    const [down , setDown] = useState(false);
  return (
    <div onMouseOver={()=>setDown(true)} onMouseOut={()=>setDown(false)} className="w-full  flex justify-start content-center items-center hover:bg-slate-100 hover:bg-opacity-20 h-[80px] ">
      <div className="avatar avatar-online">
        <div className="w-16 h-16 rounded-full">
          <Image height={100} width={100} src={data.pfp} alt="jska" />
        </div>
      </div>
      <div className=" w-full p-2 pb-0 h-full flex flex-col justify-around content-center items-center">
        <div className="w-full  flex  justify-between text-quick-400 ">
            <div>

          <h2 className="txt-color-lvl-3 text-quick-500">{data.name} </h2>
          <p className="text-quick-400">{data.lastText} </p>
        </div>
        <div className="text-quick-400 flex flex-col justify-between content-center h-full w-[40px]  ">
          <h5 className="text-sm">03:40</h5>
          <div className="flex justify-center text-xl text-center  ">
   {  data.texts !=0 &&        <p className=" color-lvl-2 px-2 py-1 text-xs text-quick-500  rounded-full">{data.texts}</p>}
            <button className= {` ${down ? "flex" :  "hidden"}  size-5  `}><Down /></button>
          </div>
        </div>

      </div>
        <div className="divider w-full mx-0 mb-0 h-[0.1px] color-lvl-3"></div>
            </div>
    </div>
  );
}

export default Contacts;
