import Image from "next/image";
import React from "react";
import Cat from "../../images/kitkit.jpeg";
import { Privacy, LogOut, Bell, Down, Story } from "@/app/icons";
import { context_val } from "@/app/chatsSection/ContextProvider";
function Settings() {
  const {
    logOut,
    setLogOut,
    profile,
    setProfile,
    storySetting,
    setStorySetting,
    settings,
    privacySetting,
    setPrivacySetting,
    notificationSetting,
    setNotificationSetting,
  } = context_val();
  return (
    <div
      className={`${
        settings ? "flex" : " hidden"
      } flex-col h-[100vh] color-lvl-1 absolute left-[6vw] z-[-1] sideBar_width `}
    >
      <div className="h-[60px] flex items-center text-quick-600 ml-2 text-2xl ">
        Setting
      </div>

      <div className="divider m-0"></div>
      <div className="flex flex-col w-full">
        <div
          onClick={() => setProfile(!profile)}
          className="flex items-center hover:bg-slate-50 hover:bg-opacity-30  ml-1"
        >
          <div className="rounded-full overflow-hidden h-[60px] w-[60px]  ">
            <Image height={100} width={100} src={Cat} alt="img" />
          </div>
          <div className="flex flex-col ml-1  w-full ">
            <h2 className="text-quick-500">Kit</h2>
            <p className="text-quick-400 text-sm text-gray-400">
              hey there im on internat
            </p>
          </div>
        </div>
        <div  className="divider m-0 p-0"></div>
        <div
          onClick={() => setPrivacySetting(!privacySetting)}
          className="hover:bg-slate-50 w-full hover:bg-opacity-30 justify-start flex py-2 px-2 items-start text-quick-400"
        >
          {" "}
          <Privacy className="mx-3 mt-1 size-5 txt-color-lvl-2 w-[30%]" />
          <div className="flex flex-col">
            <div className="flex justify-between w-[10vw] items-center">
              Privacy <Down className={`${privacySetting && "rotate-180"}`} />
            </div>
            {privacySetting && (
              <div className=" ">
                <li className="list-none">Everyone</li>
                <li className="list-none">None</li>
                <li className="list-none"> Friends</li>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => setNotificationSetting(!notificationSetting)}
          className="hover:bg-slate-50 hover:bg-opacity-30 flex py-2 px-2  items-start text-quick-400  "
        >
          {" "}
          <Bell className="mx-3 txt-color-lvl-2  w-[30%]" />
          <div className="flex flex-col">
            <div className="flex justify-between w-[10vw] items-center ">
              {" "}
              Notifications{" "}
              <Down className={` ${notificationSetting ? "rotate-180" : ""}`} />
            </div>{" "}
            {notificationSetting && (
              <div>
                <li className="list-none">Everyone</li>
                <li className="list-none">None</li>
                <li className="list-none"> Friends</li>
              </div>
            )}{" "}
          </div>
        </div>
        <div
          onClick={() => setStorySetting(!storySetting)}
          className="hover:bg-slate-50 hover:bg-opacity-30  flex py-2 px-2 items-center text-quick-400"
        >
          {" "}
          <Story className="mx-3 txt-color-lvl-2  w-[30%]" /> Status Settings
        </div>
        <div
          onClick={() => setLogOut(!logOut)}
          className="hover:bg-slate-50 hover:bg-opacity-30 flex py-2 px-2 items-center text-quick-400"
        >
          {" "}
          <LogOut className="mx-3 txt-color-lvl-2  w-[30%]" /> Logout
        </div>
      </div>
    </div>
  );
}

export default Settings;
