import React from 'react'
import Image from 'next/image'
import { Cross } from '../icons'
import Disappearingimg from "../images/image.png"
import "../global.css"
import { context_val } from '../chatsSection/ContextProvider'
function Disappearing() {
  const { disappearingComp , setDisappearingComp} = context_val();
  return (
    <>
     <div className={` ${disappearingComp ? "flex" : "hidden"} global-height flex-col bg-black fixed  global-width  overflow-scroll`}>
      <div className="flex  w-full fixed top-0 justify-start content-center items-center h-[64px] color-lvl-1   ">
              <button
                onClick={() => setDisappearingComp(false)}
                className=" text-3xl mx-2 txt-color-lvl-2 text-quick-600 "
              >
                <Cross />
              </button>
              <h2 className=" ml-4 text-2xl my-2 txt-color-lvl-3 text-quick-600">
                Disappearig Message
              </h2>
            </div>
      <div className='h-[30vh] w-full rounded-3xl mt-[64px] overflow-x-hidden overflow-hidden p-2 '>

      <Image height={100} width={100} src={Disappearingimg} className='h-[30vh] w-full px-4 rounded-3xl' alt="img.png" />
      </div>

      <div className='txt-color-lvl-4 text-quick-400 flex  flex-col p-2 ml-1 mt-3 w-full'>
        <h2 className='txt-color-lvl-2 text-quick-600 text-xl ml-3'>Make messages in this chat disappear</h2>
        <p className='px-4 '>

      For more privacy and storage, all new messages will disappear from this chat for everyone after the selected duration, except when kept. Anyone in the chat can change this setting.
        </p>
      </div>

      <div className='p-2 ml-5 text-quick-500 text-lg txt-color-lvl-3_5 capitalize'>
        <ul>

          <li className='p-2 ml-2' > <input type='radio' className='size-4 mr-2' name="duration" /> 24 hours</li>
          <li className='p-2 ml-2' > <input type='radio' className='size-4 mr-2 ' name="duration" /> 7 days</li>
          <li className='p-2 ml-2' > <input type='radio' className='size-4 mr-2 ' name="duration" /> 90 days</li>
          <li className='p-2 ml-2' > <input type='radio' className='size-4 mr-2 ' name="duration" /> off</li>
        </ul>
      </div>
    </div>
    </>
 
  )
}

export default Disappearing
