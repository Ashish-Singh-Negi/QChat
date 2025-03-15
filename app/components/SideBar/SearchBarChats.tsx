import React from 'react'
import { Search } from '@/app/icons'
function SearchBarChats() {
  return (
    <div className='flex bg-transparent mx-2  border-2 border-slate-50 rounded-2xl border-opacity-10'>
      <button className='mx-4 text-xl txt-color-lvl-3'><Search /></button>
      <input  className='bg-transparent w-full py-2 outline-none text-quick-400 ' type="text" name="" id="" />
      
    </div>
  )
}

export default SearchBarChats
