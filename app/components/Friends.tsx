import { useUserInfoContext } from "@/Context/UserInfoContext";
import React from "react";
import FriendCard from "./FriendCard";

const Friends = () => {
  const { userInfo } = useUserInfoContext();
  return (
    <div className="h-full w-full px-4 py-2">
      <header className="flex justify-between">
        <p className="w-full  py-2 font-semibold text-xl">Friends</p>
      </header>
      <main className="py-4 -mx-2">
        {userInfo?.friends.map((friend) => (
          <FriendCard friendId={friend.fid} key={friend.fid} />
        ))}
      </main>
    </div>
  );
};

export default Friends;
