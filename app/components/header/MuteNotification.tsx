import React from 'react'
import "../../global.css";
import { context_val } from '@/app/chatsSection/ContextProvider';

function MuteNotification() {
  const {  setMutePopUp } = context_val();
  return (
    <div  className=' fixed left-0 h-[100vh] w-[100vw] flex justify-center bg-opacity-80 content-center items-center  bg-black '>

    <div className=' rounded-xl  top-[30%] left-[20%]  w-[500px] color-lvl-1 p-5 '>
      <h2 className='text-quick-600 text-2xl mb-4 txt-color-lvl-3 '>Mute Notifications</h2>

      <p  className='text-quick-400 text-lg mb-2 ' >No one else in this chat will see that you muted it , and you will still be notified if you are mentioned.</p>

      <div className='flex flex-col '>
        <div className='flex pt-2 content-center items-center  '>
            <input className=' size-4 mr-3' type="radio" name="mute" />
            <div className='text-quick-400 text-lg txt-color-lvl-4'>8 hours</div>
        </div>
        <div className='flex pt-2 content-center items-center '>
            <input className=' size-4 mr-3' type="radio" name="mute" />
            <div className='text-quick-400 text-lg  txt-color-lvl-4'>1 week</div>
        </div>
        <div className='flex pt-2 pb-4 content-center items-center'>
            <input className=' size-4 mr-3' type="radio" name="mute" />
            <div className='text-quick-400 text-lg  txt-color-lvl-4' >Always</div>
        </div>
      </div>

      <div className=' flex justify-end'>
        <button onClick={()=>setMutePopUp(false)} className='p-2 txt-color-lvl-2 color-lvl-4 rounded-3xl mx-3 hover:bg-transparent border-transparent hover:text-white hover:border-white border-[2px]  text-quick-500 '>Cancel</button>
        <button className='p-2 color-lvl-2 rounded-2xl hover:bg-transparent hover:text-white border-transparent hover:border-white border-[2px] mx-3  text-quick-400 ' >Mute</button>
      </div>
    </div>
    </div>
  )
}

export default MuteNotification
