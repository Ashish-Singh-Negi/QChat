import React from 'react'
import Cat from "../../images/kitkit.jpeg"
import Image from 'next/image'
import {Chats , Setting , Story} from "../../icons"
function Sidebar() {
  return (
    <div className='h-[100vh] w-[60px] border-r-2 mr-[3px] border-slate-50  border-opacity-5'>
     <div className='flex flex-col h-[80vh] justify-start content-center items-center'>
       <button className='text-xl txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center' ><Chats/></button>
       <button className='text-xl txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center'><Story/></button>
     </div>
     <div className='flex flex-col  justify-around h-[30vh] items-center  '>
     <button className='text-xl txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center'><Setting/></button>
       <button className='text-lg txt-color-lvl-3 hover:bg-slate-50 hover:bg-opacity-15 rounded-full  p-4 content-center text-center'>
        <Image src={Cat} height={100} width={100} alt="pfp" />
       </button>
     </div>
    </div>
  )
}

export default Sidebar
