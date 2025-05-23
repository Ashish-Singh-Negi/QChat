import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";

import { Room, UserInfo } from "../Inteface/definations";
import { IoPersonRemove } from "react-icons/io5";
import { BsChatLeftText } from "react-icons/bs";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";
import { useUserContactContext } from "@/Context/UserContactContext";

const FriendCard = ({ friendId }: { friendId: string }) => {
  const [friend, setFriend] = useState<UserInfo | null>(null);

  const { getContactInfo } = useUserContactContext();
  const { setUserInfo } = useUserInfoContext();

  useEffect(() => {
    if (!friendId) return;
    (async () => {
      const contact = await getContactInfo(friendId);
      setFriend(contact);
    })();
  }, []);

  const removeFriendHandler = async () => {
    try {
      // Remove friend
      await axiosInstance.patch(`/users/friends/${friendId}/remove`);

      // Refetch user info with updated friendList
      const response = await axiosInstance.get<{
        data: UserInfo;
      }>("/users/profile", {
        params: { filter: "friendList" },
      });

      // Update state
      setUserInfo((prev) => ({
        ...prev!,
        friendList: response.data.data.friendList,
      }));

      // show success message
      toast.success("Friend removed successfully");
    } catch (error) {
      console.error("Error removing friend or updating list:", error);
      // show error message
      toast.error("Failed to remove friend");
    }
  };

  const createChatRoom = async () => {
    try {
      // create chat room
      const response = await axiosInstance.post<{ data: Room }>(
        `/users/chats`,
        {
          fid: friendId,
        }
      );

      console.log("Room data : ", response.data.data);
    } catch (error: any) {
      console.error(error);
      if (error.response.status === 409) {
        console.log("JOINING ");
      }
    }
  };

  return friend ? (
    <div className="h-16 w-full border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex gap-2 items-center">
        <div
          className={`h-14 w-14 bg-gray-500 ${
            friend.isOnline && "bg-emerald-500"
          } rounded-full grid place-items-center`}
        >
          <img
            src={friend?.profilePic}
            className="h-[52px] w-[52px] rounded-full"
          />
          {/* <span
            className={`absolute bottom-0 right-0 h-4 w-4 bg-red-500 rounded-full`}
          ></span> */}
        </div>
        <div>
          <p className="font-medium dark:text-white">{friend?.username}</p>
          {friend.isOnline ? (
            <span className="text-emerald-500">Online</span>
          ) : (
            <span className="text-red-500">Offline</span>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => createChatRoom()}
          className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 darK:hover:bg-gray-800"
        >
          <BsChatLeftText className="h-5 w-5 text-blue-600 dark:text-blue-500 active:scale-95 transition-transform" />
        </button>
        <button
          onClick={() => removeFriendHandler()}
          className="h-10 w-10 flex justify-center items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 darK:hover:bg-gray-800"
        >
          <IoPersonRemove className="h-5 w-5 text-red-500 active:scale-95 transition-transform" />
        </button>
      </div>
    </div>
  ) : (
    <div className="h-16 w-full animate-pulse border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex gap-2 items-center">
        <div className="h-11 w-11 bg-gray-200 dark:bg-gray-900 rounded-full grid place-items-center">
          {/* <img src={friend?.profilePic} className="h-10 w-10 rounded-full" /> */}
        </div>
        <p className="h-6 w-32 rounded-xl bg-gray-200 dark:bg-gray-900 font-medium dark:text-white mb-1"></p>
      </div>
      <button className="h-8 w-8 flex justify-center items-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 darK:hover:bg-gray-800">
        <IoPersonRemove className="h-5 w-5 text-gray-200 dark:text-gray-900 active:scale-95 transition-transform" />
      </button>
    </div>
  );
};

export default FriendCard;
