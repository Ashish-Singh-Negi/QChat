import React, { useState } from 'react'
import { Search } from '@/app/icons'
function SearchBarChats() {
  const [txt , setTxt]  = useState("");

  return (
    <div className='flex bg-transparent mx-2  border-2 border-slate-50 rounded-2xl border-opacity-10'>
      <button onClick={()=>setTxt("")} className='mx-4 text-xl txt-color-lvl-3'><Search /></button>
      <input value={txt} onChange={(e)=>setTxt(e.target.value)} className='bg-transparent w-full py-2 outline-none text-quick-400 ' type="text" name="" id="" />
      
    </div>
  )
}

export default SearchBarChats
