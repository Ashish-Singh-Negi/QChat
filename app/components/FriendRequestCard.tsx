import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";
import { UserInfo } from "../Inteface/definations";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";

const FriendRequestCard = ({ friendRequest }: { friendRequest: string }) => {
  const [friendProfile, setFriendProfile] = useState<UserInfo | null>(null);

  const { userInfo, setUserInfo } = useUserInfoContext();

  const getFriendProfile = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
        };
      } = await axiosInstance.get(`/users/friends/${friendRequest}`);

      console.log(data);

      setFriendProfile(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/users/friends/${friendRequest}/accept`
      );

      console.log(data);

      toast.success("Request Accepted");
    } catch (error) {
      console.error(error);
    }

    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
        };
      } = await axiosInstance.get(`/users/profile`, {
        params: {
          filter: "friendList friendRequestList",
        },
      });

      setUserInfo({
        ...userInfo!,
        friendList: data.data.friendList,
        friendRequestList: data.data.friendRequestList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {
    try {
      await axiosInstance.patch(`/users/friends/${friendRequest}/reject`);
    } catch (error) {
      console.error(error);
    }

    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
        };
      } = await axiosInstance.get(`/users/profile`, {
        params: {
          filter: "friendRequestList",
        },
      });

      setUserInfo({
        ...userInfo!,
        friendRequestList: data.data.friendRequestList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriendProfile();
  }, []);

  return (
    <div className="w-full flex  items-center gap-2 border-l-2 border-red-500 pl-2 py-1 mb-4">
      <p className="w-full font-medium">{friendProfile?.username}</p>
      <div className="flex gap-2">
        <button
          onClick={acceptFriendRequest}
          className="px-2 py-1 rounded-md font-semibold text-white text-sm bg-blue-700 active:scale-95 transition-all"
        >
          Accept
        </button>
        <button
          onClick={rejectFriendRequest}
          className="px-2 py-1 rounded-md font-semibold text-white text-sm bg-red-500 active:scale-95 transition-all"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequestCard;
