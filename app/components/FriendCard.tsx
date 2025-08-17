import React, { useEffect, useState } from "react";

import { Room, UserInfo } from "../../Interface/definations";

// import { useUserContactContext } from "@/Context/UserContactContext";
import ProfilePic from "./ProfilePic";
import { getContactInfo } from "@/utils/ContactService";
// import axiosInstance from "@/utils/axiosinstance";
import { MessageCircle, UserRoundMinus } from "lucide-react";
import axiosInstance from "@/utils/axiosinstance";
import { useChatsContext } from "@/Context/ChatsContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";

const FriendCard = ({ friendId }: { friendId: string }) => {
  const [friend, setFriend] = useState<UserInfo | null>(null);
  const { chats, setCurrentChatId } = useChatsContext();
  const { setUserInfo } = useUserInfoContext();

  useEffect(() => {
    console.log(friendId);
    if (!friendId) return;
    (async () => {
      const friend = await getContactInfo(friendId);
      console.log(friend);
      setFriend(friend);
    })();
  }, []);

  const removeFriendHandler = async () => {
    toast.error("Comming soon");
    return;

    try {
      // Remove friend
      await axiosInstance.patch(`/friends/${friendId}/remove`);

      // Refetch user info with updated friendList
      const response = await axiosInstance.get<{
        data: UserInfo;
      }>("/profile", {
        params: { filter: "friends" },
      });

      // Update state
      setUserInfo((prev) => ({
        ...prev!,
        friends: response.data.data.friends,
      }));

      // show success message
      toast.success("Friend removed successfully");
    } catch (error) {
      console.error("Error removing friend or updating list:", error);
      // show error message
    }
  };

  const startChatHandler = async () => {
    const isChatExist = chats?.find((chat) => {
      if (chat.participants.find((participant) => participant === friendId)) {
        return chat;
      }
    });
    if (isChatExist) {
      setCurrentChatId(isChatExist._id);
      return;
    }

    try {
      // create chat room
      const response = await axiosInstance.post<{ data: Room }>(`/chats`, {
        fid: friendId,
      });

      console.log("Room data : ", response.data.data);
    } catch (error: any) {
      console.error(error);
    }
  };

  return friend ? (
    <div className="h-[72px] w-full px-2 mb-1 animate-dropdownOpen">
      <div className="group h-full w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={friend.profilePic}
            username={friend.username}
          />
        </div>
        <div className="h-14 w-[90%] flex justify-between items-center">
          <p className="font-medium mt-1">{friend?.username}</p>
          <div className="group-hover:opacity-100 group-hover:animate-dropdownOpen opacity-0 animate h-10 flex">
            <button
              onClick={() => startChatHandler()}
              className="h-full rounded-l-3xl px-4 text-sm font-medium text-blue-500 hover:bg-white dark:hover:bg-black active:scale-95 transition-all"
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => removeFriendHandler()}
              className="h-full rounded-r-3xl px-4 text-sm font-medium text-red-500 hover:bg-white dark:hover:bg-black  active:scale-95 transition-all"
            >
              <UserRoundMinus size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="h-16 w-full animate-pulse border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex gap-2 items-center">
        <div className="h-11 w-11 bg-gray-200 dark:bg-gray-900 rounded-full grid place-items-center"></div>
        <p className="h-6 w-32 rounded-xl bg-gray-200 dark:bg-gray-900 font-medium dark:text-white mb-1"></p>
      </div>
    </div>
  );
};

export default FriendCard;
