import React,{useState} from "react";
import { IMessage } from "../../Inteface/message";
import List from "./List";
import "../../global.css";
import { context_val } from "@/app/chatsSection/ContextProvider";
import { Checked, UnChecked } from "@/app/icons";

function Sent(data: { css: string; message: IMessage }) {
  const { sent_Text, setSent_Text, checked } = context_val();
  const [boxChecked , setBoxChecked] = useState(false);
  return (
   <div className={` flex ${checked ?`justify-between ${data.css}` : "justify-end"} `}>
          {checked && (
           <button
             className=" ml-4 flex self-start text-2xl my-2 txt-color-lvl-3 text-quick-600"
             onClick={() => setBoxChecked(!boxChecked)}
           >
             {boxChecked ? <Checked /> : <UnChecked />}
           </button>
         )}
   <div className={` flex justify-end items-end  ${!checked && data.css}  `}>

<div
  onDoubleClick={() => setSent_Text(!sent_Text)}
  className="shadow-lg  color-lvl-2 px-2 py-1 mx-3 mt-1 rounded-xl "
>
  <div>
    <p className="txt-color-lvl-4 text-quick-500">
      {" "}
      {data.message.message}
    </p>
    <p className="txt-color-lvl-1 text-quick-500 text-right text-[0.6rem] p-0  ">
      {data.message.date}
    </p>
  </div>
</div>
{sent_Text && (
  <div className="absolute right-8 top-5">
    <List />
  </div>
)}
</div>
   </div>
    
  );
}

export default Sent;
