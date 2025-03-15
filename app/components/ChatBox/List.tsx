"use client"
import React, { Dispatch, SetStateAction } from 'react'
import { context_val } from '@/app/chatsSection/ContextProvider';

function List(data:{text :string, stared :boolean ,  setStared : Dispatch<SetStateAction<boolean>> ,  setReacting : Dispatch<SetStateAction<boolean>>}) {
 const {visibility , setVisibility , setReplying } = context_val();
  const handleCopy = ()=>{
    if(data.text != ""){
      navigator.clipboard.writeText(data.text);
    }
  }
  
  return (
    <>
    
    <div  className=' rounded-2xl list-none  shadow-2xl sent-dot-list color-lvl-3   p-4 z-10 bg-white'> 
      <li onClick={()=>setReplying(true)} className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Reply</li>
      <li onClick={handleCopy} className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Copy</li>
      <li onClick={()=>data.setReacting(true)} className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>React</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Forward</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Pin</li>
      <li onClick={()=>data.setStared(!data.stared)} className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>star</li>
      <li onClick={()=>setVisibility(!visibility)} className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Delete</li>
    </div>

    </>
  )
}

export default List
