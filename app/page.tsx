"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { useUserInfoContext } from "@/Context/UserInfoContext";
import { useChatsContext } from "@/Context/ChatsContext";

import axiosInstance from "@/utils/axiosinstance";

import ChatSection from "./components/ChatSection";
import Chats from "./components/Chats";
import UserProfile from "./components/UserProfile";

import ProfilePic from "./components/ProfilePic";
import SearchUser from "./components/SearchUser";
import Friends from "./components/Friends";
import { MessageCircleMore, Search, UsersRound } from "lucide-react";
import ThemeToggleBtn from "./components/ThemeToggleBtn";

export default function Home() {
  const { getUserProfile } = useUserInfoContext();
  const { selectedChat } = useChatsContext();

  const [nav, setNav] = useState([
    { name: "Chats", isActive: true, component: <Chats /> },
    {
      name: "Friends",
      isActive: false,
      component: <Friends />,
    },
    { name: "Search", isActive: false, component: <SearchUser /> },
    { name: "Profile", isActive: false, component: <UserProfile /> },
  ]);

  const disappearMessagesAboveDurationHandler = async () => {
    try {
      await axiosInstance.delete(
        `/chats/${selectedChat?._id}/messages/disappear`
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (!selectedChat) return;

    if (selectedChat.disappearingMessages !== "OFF") {
      disappearMessagesAboveDurationHandler();
    }
  }, [selectedChat]);

  console.log("RENDER");

  return (
    <>
      <Toaster position="bottom-left" />
      <main className="h-full w-full flex overflow-hiddens text-black dark:text-white">
        <nav className="h-full w-16 bg-red-200 dark:bg-black border-r-[1px] dark:border-gray-800 flex flex-col justify-between py-4">
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
                nav[0].isActive && "bg-red-50 dark:bg-slate-700"
              } h-14 w-full ml-2 mb-4 bg-red-100 translate-x-1 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center justify-center rounded-l-full -rotate-6 cursor-pointer active:scale-95 transition-all`}
            >
              <MessageCircleMore strokeWidth={1.25} className="h-6 w-6" />
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
                nav[1].isActive && "bg-red-50 dark:bg-slate-700"
              } h-14 w-full ml-2 mb-4 bg-red-100 translate-x-1 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center justify-center rounded-l-full -rotate-6 cursor-pointer active:scale-95 transition-all`}
            >
              <UsersRound strokeWidth={1.25} className="h-6 w-6" />
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
                nav[2].isActive && "bg-red-50 dark:bg-slate-700"
              } h-14 w-full ml-2 mb-4 bg-red-100 translate-x-1 dark:bg-gray-900 hover:bg-red-50 dark:hover:bg-slate-700 flex items-center justify-center rounded-l-full -rotate-6 cursor-pointer active:scale-95 transition-all`}
            >
              <Search strokeWidth={1.25} className="h-6 w-6" />
            </button>
          </div>

          <div className="h-fit w-full flex flex-col items-center">
            <ThemeToggleBtn />
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

        <section className="h-full w-[30%] z-10 flex flex-col border-r-[1px] border-red-200 bg-red-50 dark:border-gray-800 dark:bg-black">
          {nav.map((value) => value.isActive && value.component)}
        </section>
        <ChatSection />
      </main>
    </>
  );
}
