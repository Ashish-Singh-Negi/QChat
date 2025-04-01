import React from 'react'
import SearchBarChats from './SearchBarChats'
import { AddChat, Three_dot } from '@/app/icons'
import { context_val } from '@/app/chatsSection/ContextProvider'
import Side_ThreeDotList from './Side_ThreeDotList';

function SidebarNav() {
  const {sideThreeDot , setSideThreeDot , addChats , setAddChats} = context_val();
  return (

    <div>
      <div className='h-[64px] w-full p-2  flex justify-between items-center '>

        { sideThreeDot && <div className='absolute right-0 top-[7vh]'><Side_ThreeDotList /></div>}
      <div className='  text-3xl md:text-2xl pb-0 text-quick-500'>Chats</div>

      <div className='flex w-[100px] justify-around'>
        <AddChat onClick={()=>setAddChats(!addChats)} className=' rotate-180 text-2xl txt-color-lvl-2' />
        <Three_dot onClick={()=>setSideThreeDot(!sideThreeDot)} className='text-2xl txt-color-lvl-2' />

      </div>
      </div>
      <div>
     <SearchBarChats />


      </div>
      <div>
        <button className='p-1 my-1 md:my-3 px-2 mx-1 ml-2  text-quick-500 active:color-lvl-2 rounded-2xl color-lvl-2 bg-opacity-10  '> All </button>
        <button className='p-1 md:my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '> Unread</button>
        <button className='p-1 md:my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '>Favorites</button>
        <button className='p-1 md:my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '> Groups</button>
      </div>
    </div>
  )
}

export default SidebarNav
