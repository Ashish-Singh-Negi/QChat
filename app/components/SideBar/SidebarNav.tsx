import React from 'react'
import SearchBarChats from './SearchBarChats'

function SidebarNav() {
  return (
    <div>
      <div className='h-[64px] w-full p-2  '>
      <div className='text-3xl pb-0 text-quick-500'>Chats</div>
      </div>
      <div>
     <SearchBarChats />
      </div>
      <div>
        <button className='p-1 my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl color-lvl-2 bg-opacity-10 '> All </button>
        <button className='p-1 my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '> Unread</button>
        <button className='p-1 my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '>Favorites</button>
        <button className='p-1 my-3 px-2 mx-1 ml-2 text-quick-500 active:color-lvl-2 rounded-2xl bg-slate-50 bg-opacity-10 '> Groups</button>
      </div>
    </div>
  )
}

export default SidebarNav
