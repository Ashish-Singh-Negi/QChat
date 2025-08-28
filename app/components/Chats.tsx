import React, { useState } from "react";

import { useUserInfoContext } from "@/Context/UserInfoContext";

import ContactCard from "./ContactCard";
import FriendCard from "./FriendCard";

const Chats = () => {
  const { userInfo } = useUserInfoContext();

  const [search, setSearch] = useState("");

  return (
    <>
      {" "}
      <header className="px-4 py-2 mb-2 flex justify-between items-center">
        <h1 className="font-semibold text-4xl">
          Q<span className="text-red-500 underline underline-offset-2">Chat</span>
        </h1>
      </header>
      <div className="px-4">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className="h-10 w-full rounded-2xl bg-gray-100 dark:bg-gray-900 outline-none border-2 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-900 focus:border-red-300 placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-red-300 px-4 py-1 transition-all"
          placeholder="Search Chats"
        />
      </div>
      <main className="flex-1 w-full mt-2 py-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-800">
        {!search &&
          userInfo &&
          userInfo.chats.map((chat, i) => (
            <ContactCard index={i} key={chat.chatId} chatId={chat.chatId} />
          ))}
        {search && (
          <>
            <p className="h-8 w-full bg-gray-200 dark:bg-gray-800 px-4 py-1 mb-2 animate-slideIn">
              Friends
            </p>
            {userInfo?.friends
              .filter((friend) =>
                friend.name.toLowerCase().startsWith(search.toLowerCase())
              )
              .map((friend) => (
                <FriendCard friendId={friend.fid} key={friend.fid} />
              ))}
          </>
        )}
      </main>
    </>
  );
};

export default Chats;
