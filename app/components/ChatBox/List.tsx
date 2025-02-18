"use client"
import React from 'react'

function List() {
  return (
    <div  className=' rounded-2xl  shadow-2xl sent-dot-list color-lvl-3   p-4 z-10 bg-white'> 
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Reply</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Copy</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>React</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Forward</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Pin</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>star</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Report</li>
      <li className='text-white text-opacity-60  text-quick-500 hover:bg-green-950 hover:bg-opacity-25 ml-1  rounded-lg w-full py-1'>Delete</li>
    </div>
  )
}

export default List
