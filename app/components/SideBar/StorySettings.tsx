import { context_val } from '@/app/chatsSection/ContextProvider'
import { ALeft } from '@/app/icons';
import React from 'react'

function StorySettings() {
    const {storySetting , setStorySetting} = context_val();
  return (
    <div className={`${storySetting ? "flex" :  "hidden"}  flex-col absolute left_l z-[-1] color-lvl-1  sideBar_width h-[100vh]`}>
      <div className='flex h-[60px] items-center text-quick-500'>
        <ALeft className='mx-1 txt-color-lvl-2' onClick={()=>setStorySetting(false)} /> Status Privacy
      </div>
      <div className=' text-quick-400 w-ful ml-2 txt-color-lvl-3 text-xl'>who can see my status updates on whatsApp</div>

      <div className=' my-2 mx-2 text-quick-500'>
        <div className='divider m-0 p-0'></div>
        <div className='my-2'> <input type="radio" name="privacy" id="" /> My Status</div>
        <div className='divider m-0 p-0'></div>
        <div className='my-2'> <input type="radio" name="privacy" id="" /> My contacts except... </div>
        <div className='divider m-0 p-0'></div>
        
      </div>
    </div>
  )
}

export default StorySettings
