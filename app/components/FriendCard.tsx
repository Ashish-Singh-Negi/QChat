import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";

import { UserInfo } from "../Inteface/definations";
import { IoPersonRemove } from "react-icons/io5";

const FriendCard = ({ friendId }: { friendId: string }) => {
  const [friend, setFriend] = useState<UserInfo | null>(null);

  const getFriendsDetails = async (friendId: string) => {
    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
        };
      } = await axiosInstance.get(`/users/friends/${friendId}`);

      console.log(data);
      setFriend(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriendsDetails(friendId);
  }, []);

  return (
    <div className="h-16 w-full border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex gap-2 items-center">
        <div className="h-11 w-11 bg-gray-950 rounded-full grid place-items-center">
          <img src={friend?.profilePic} className="h-10 w-10 rounded-full" />
        </div>
        <p className="font-medium dark:text-white mb-2">{friend?.username}</p>
      </div>

      <button className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 darK:hover:bg-gray-800">
        <IoPersonRemove className="h-5 w-5 text-red-500 active:scale-95 transition-transform" />
      </button>
    </div>
  );
};

export default FriendCard;
