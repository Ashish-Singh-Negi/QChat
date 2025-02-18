import React from 'react'
import "../../global.css"
import "../style.css"
function ThreeList() {
  return (
    <div className='fixed shadow-2xl Three-dot-list right-4 Th top-[60px] color-lvl-3   p-4 z-10 bg-white'>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Contact info</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Select messages</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Mute Notification</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Disapearing message</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Add To favorite</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Close Chat</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Delete chat</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Close Chat</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1 rounded-lg w-full py-1'>Clear Chat</li>
    </div>
  )
}

export default ThreeList
