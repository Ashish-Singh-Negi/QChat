import { Add } from '@/app/icons'
import Image from 'next/image'
import React from 'react'
import Cat from "../../images/kitkit.jpeg"
function StroryOthers() {
  return (
    <div className='flex flex-col w-full my-1'>
        <div className='flex w-full'>
      <div className='h-[50px] mr-2  relative w-[50px] rounded-full overflow-hidden ' >
        <Image height={100} width={100} src={Cat} alt='img' />
   <div className="color-lvl-3 txt-color-lvl-4 rounded-full ">
    <Add/>
   </div>
      </div>
      <div className='flex flex-col'>
        <h3 className='text-quick-400 text-md'>22FF</h3>
        <p className='text-quick-400 text-xs text-gray-500'>Today at 10:25</p>
      </div>

        </div>
        <div className='divider m-0  w-full'></div>
    </div>
  )
}

export default StroryOthers
