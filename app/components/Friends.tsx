import { useUserInfoContext } from "@/Context/UserInfoContext";
import React, { useState } from "react";
import FriendCard from "./FriendCard";
import FriendRequestCard from "./FriendRequestCard";

const Friends = () => {
  const { userInfo } = useUserInfoContext();

  const [nav, setNav] = useState([
    {
      title: "Friends",
      active: true,
    },
    { title: "Requests", active: false },
  ]);

  return (
    <div className="h-full w-full py-1">
      <header className="flex justify-evenly">
        {nav.map((nav) => (
          <div
            key={nav.title}
            onClick={() =>
              setNav((prevNav) =>
                prevNav.map((item) => ({
                  ...item,
                  active: !item.active,
                }))
              )
            }
            className={`w-full  ${
              nav.active && " text-gray-950 dark:text-white"
            } text-gray-400 dark:text-gray-600 bg-opacity-30 border-red-400 py-2 font-semibold text-xl text-center cursor-pointer transition-all`}
          >
            {nav.title}
          </div>
        ))}
      </header>
      <main className="py-4">
        {nav[0].active &&
          userInfo?.friends.map((friend) => (
            <FriendCard friendId={friend.fid} key={friend.fid} />
          ))}
        {nav[1].active &&
          userInfo?.friendRequests.map((friendRequest) => (
            <FriendRequestCard requestId={friendRequest} key={friendRequest} />
          ))}
      </main>
    </div>
  );
};

export default Friends;
