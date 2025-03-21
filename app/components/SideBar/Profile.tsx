import React, { FormEvent, useState } from "react";
import Cat from "../../images/kitkit.jpeg";
import Image from "next/image";
import { ALeft, Edit } from "@/app/icons";
import { context_val } from "@/app/chatsSection/ContextProvider";
function Profile() {
  const { profile, setProfile } = context_val();
  const [nameEdit, setNameEdit] = useState(false);
  const [aboutEdit, setAboutEdit] = useState(false);
  const [profileEdit , setProfileEdit] = useState(false)
  const [name, setName] = useState("Kit");
  const [about, setAbout] = useState("hey there i am on internate");

  const handleSubmit = (e  : FormEvent<HTMLFormElement>)=>{
 e.preventDefault();
 setNameEdit(false)
 setAboutEdit(false)
  }
  return (
 <form onSubmit={handleSubmit} >


    <div className={` ${profile ? "flex" : "hidden"} h-[100vh] flex-col sideBar_width color-lvl-1 absolute z-0 left-[6vw] `}>
      <div className="h-[60px]   items-center flex ml-2 text-quick-600 text-xl ">
        {" "}
        <ALeft
          className="mr-2  txt-color-lvl-2"
          onClick={() => setProfile(false)}
        />{" "}
        Profile{" "}
      </div>
      <div onMouseEnter={()=>setProfileEdit(true)} onMouseLeave={()=>setProfileEdit(false)} className="rounded-full relative flex flex-col justify-center self-center content-center items-center h-[200px] w-[200px] overflow-hidden  ">
        <Image
          className="rounded-full"
          height={100}
          width={100}
          src={Cat}
          alt=""
        />
        <div className={`${profileEdit ? "flex" : "hidden"} absolute z-20  bg-slate-50 bg-opacity-35 h-full w-full `}>

        <Edit className="txt-color-lvl-1 size-8 "/>
        </div>
      </div>
      <div className="flex flex-col justify-center mx-2">
        <h2 className="text-quick-500 txt-color-lvl-3">Your Name</h2>
        <div className="flex justify-between text-quick-400 py-3 text-sm">
          {nameEdit ? (
            <input
            className="bg-transparent outline-none border-b-[1px] border-slate-50 w-full border-opacity-30 "
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          ) : (
            <p>{name}</p>
          )}

          <Edit className="mx-1 size-5 txt-color-lvl-3"  onClick={()=>setNameEdit(!nameEdit)} />
        </div>
      </div>
      <div className="flex flex-col justify-between mx-2 ">
        <h2 className="text-quick-500 txt-color-lvl-3">About</h2>
        <div className="flex justify-between text-quick-400 py-3 text-sm">
          {aboutEdit ? (
            <input
            className="bg-transparent outline-none border-b-[1px] border-slate-50 w-full border-opacity-30 "

              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          ) : (
            <p>{about}</p>
          )}
          <Edit className="mx-1 size-5 txt-color-lvl-3" onClick={()=>setAboutEdit(!aboutEdit)} />
        </div>
      </div>
    </div>
    </form>
  );
}

export default Profile;
