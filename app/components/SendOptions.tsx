import React, { useRef, useState } from "react";
import { Files } from "../icons";

function SendOptions(data :{visible: boolean}) {
  const [grp , setGrp ] = useState(false);
  const filesRef = useRef<HTMLInputElement>(null);
    const handleClick = ()=>{
      filesRef.current?.click();
    }



  return (
    <div
      className={` ${
        data.visible ? "flex" : "hidden"
      } flex-col  rounded-2xl list-none  shadow-2xl w-[250px] color-lvl-3   p-4 z-10 bg-white`}
    >
       
      <input ref={filesRef} className="hidden" type="file" name="files" id="" />
      <li onClick={handleClick} className="flex content-center  text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1">
    <Files  className="self-center mr-3 text-blue-950 size-6 " />    Files
      </li>
   { grp &&  <li className="text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1">
        poll
      </li>}
    </div>
  );
}

export default SendOptions;
