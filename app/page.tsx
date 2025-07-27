"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { useRoomContext } from "@/Context/RoomContext";

import axiosInstance from "@/utils/axiosinstance";

import ChatSection from "./components/ChatSection";
import Chats from "./components/Chats";
import UserProfile from "./components/UserProfile";

import { IoChatbubbles } from "react-icons/io5";
import { FaUserFriends } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import ProfilePic from "./components/ProfilePic";
import SearchUser from "./components/SearchUser";

export default function Home() {
  const { getUserProfile } = useUserInfoContext();
  const { roomId } = useWebSocketContext();
  const { roomInfo } = useRoomContext();

  const [nav, setNav] = useState([
    { name: "Chats", isActive: false, component: <Chats /> },
    {
      name: "Friends",
      isActive: false,
      component: (
        <div className="h-full w-full px-4 py-2">
          <header className="flex justify-between">
            <p className="w-full border-b-2 border-red-300 text-red-300 py-2 font-semibold text-xl">
              Friends
            </p>
          </header>
          <main className="py-4"></main>
        </div>
      ),
    },
    { name: "Serach", isActive: true, component: <SearchUser  /> },
    { name: "Profile", isActive: false, component: <UserProfile /> },
  ]);

  const disappearMessagesAboveDurationHandler = async () => {
    try {
      await axiosInstance.delete(`/chats/${roomId}/messages/disappear`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  // useEffect(() => {
  // if (!roomId) return;
  // (async () => {
  //   setMessages(await getChatMessages(roomId));
  // })();
  // }, [roomId]);

  useEffect(() => {
    if (!roomInfo || !roomId) return;

    if (roomInfo.disappearingMessages !== "OFF") {
      disappearMessagesAboveDurationHandler();
    }
  }, [roomInfo]);

  console.log("RENDER");

  return (
    <>
      {/* <Websocket /> */}
      <Toaster position="bottom-left" />
      <main className="h-full w-full flex overflow-hidden">
        {/* <NavBar /> */}
        <nav className="h-full w-16 dark:bg-black border-r-[1px] dark:border-gray-800 flex flex-col justify-between py-4">
          <div className="h-full w-full flex flex-col items-center">
            <button
              onClick={() =>
                setNav((prev) => [
                  { ...prev[0], isActive: true },
                  { ...prev[1], isActive: false },
                  { ...prev[2], isActive: false },
                  { ...prev[3], isActive: false },
                ])
              }
              className={`${
                nav[0].isActive && "bg-gray-300 dark:bg-slate-700"
              } h-10 w-10 mb-4 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center rounded-full cursor-pointer active:scale-95 transition-all`}
            >
              <IoChatbubbles className="h-6 w-6 text-black dark:text-white" />
            </button>
            <button
              onClick={() =>
                setNav((prev) => [
                  { ...prev[0], isActive: false },
                  { ...prev[1], isActive: true },
                  { ...prev[2], isActive: false },
                  { ...prev[3], isActive: false },
                ])
              }
              className={`${
                nav[1].isActive && "bg-gray-300 dark:bg-slate-700"
              } h-10 w-10 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center mb-4 rounded-full cursor-pointer active:scale-95 transition-all `}
            >
              <FaUserFriends className="h-6 w-6 text-black dark:text-white" />
            </button>
            <button
              onClick={() =>
                setNav((prev) => [
                  { ...prev[0], isActive: false },
                  { ...prev[1], isActive: false },
                  { ...prev[2], isActive: true },
                  { ...prev[3], isActive: false },
                ])
              }
              className={`${
                nav[2].isActive && "bg-gray-300 dark:bg-slate-700"
              } h-10 w-10 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-slate-700 flex items-center justify-center mb-4 rounded-full cursor-pointer active:scale-95 transition-all `}
            >
              <IoMdSearch className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
          <div className="h-fit w-full flex flex-col items-center">
            <div
              onClick={() =>
                setNav((prev) => [
                  { ...prev[0], isActive: false },
                  { ...prev[1], isActive: false },
                  { ...prev[2], isActive: false },
                  { ...prev[3], isActive: true },
                ])
              }
              className={`${
                nav[3].isActive && "bg-gray-300 dark:bg-slate-700"
              } h-10 w-10 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-slate-700 rounded-full cursor-pointer active:scale-95 transition-all `}
            >
              <ProfilePic />
            </div>
          </div>
        </nav>

        <section className="h-full w-[30%] flex flex-col border-r-[1px] dark:border-gray-800 dark:bg-black">
          {nav.map((value) => value.isActive && <>{value.component}</>)}
        </section>
        <ChatSection />
      </main>
    </>
  );
}
