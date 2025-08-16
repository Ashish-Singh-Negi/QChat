import React, { useEffect, useState } from "react";

import { UserInfo } from "../../Interface/definations";

// import { useUserContactContext } from "@/Context/UserContactContext";
import ProfilePic from "./ProfilePic";
import { getContactInfo } from "@/utils/ContactService";
// import axiosInstance from "@/utils/axiosinstance";
import { MessageCirclePlus, UserRoundMinus } from "lucide-react";

const FriendCard = ({ friendId }: { friendId: string }) => {
  const [friend, setFriend] = useState<UserInfo | null>(null);

  // const { getContactInfo } = useUserContactContext();

  useEffect(() => {
    console.log(friendId);
    if (!friendId) return;
    (async () => {
      const contact = await getContactInfo(friendId);
      console.log(contact);
      setFriend(contact);
    })();
  }, []);

  // const removeFriendHandler = async () => {
  //   try {
  //     // Remove friend
  //     await axiosInstance.patch(`/friends/${friendId}/remove`);

  //     // Refetch user info with updated friendList
  //     const response = await axiosInstance.get<{
  //       data: UserInfo;
  //     }>("/profile", {
  //       params: { filter: "friends" },
  //     });

  //     // Update state
  //     setUserInfo((prev) => ({
  //       ...prev!,
  //       friends: response.data.data.friends,
  //     }));

  //     // show success message
  //     toast.success("Friend removed successfully");
  //   } catch (error) {
  //     console.error("Error removing friend or updating list:", error);
  //     // show error message
  //   }
  // };

  // const createChatRoom = async () => {
  //   try {
  //     // create chat room
  //     const response = await axiosInstance.post<{ data: Room }>(`/chats`, {
  //       fid: friendId,
  //     });

  //     console.log("Room data : ", response.data.data);
  //   } catch (error: any) {
  //     console.error(error);
  //     if (error.response.status === 409) {
  //       console.log("JOINING ");
  //     }
  //   }
  // };

  return friend ? (
    <div className="h-[72px] w-full px-2 mb-1">
      <div className="h-full w-full hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={friend.profilePic}
            username={friend.username}
          />
        </div>
        <div className="h-14 w-[90%] flex justify-between items-center">
          <p className="font-medium mt-1">{friend?.username}</p>
          <div className="h-10 flex">
            <button className="h-full rounded-l-3xl px-4 text-sm font-medium text-blue-500 hover:bg-gray-100 dark:hover:bg-black active:scale-95 transition-all">
              <MessageCirclePlus size={20} />
            </button>
            <button className="h-full rounded-r-3xl px-4 text-sm font-medium text-red-500 hover:bg-gray-100 dark:hover:bg-black  active:scale-95 transition-all">
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
