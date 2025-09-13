import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosinstance";

import { useUserInfoContext } from "@/Contexts/UserInfoContext";

import { FriendRequest, UserInfo } from "../../types/definations";

import ProfilePic from "./ProfilePic";

const FriendRequestCard = ({ requestId }: { requestId: string }) => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(
    null
  );

  const { userInfo, setUserInfo } = useUserInfoContext();

  const getFriendRequest = async () => {
    try {
      console.log(friendRequest);

      const {
        data,
      }: {
        data: {
          data: FriendRequest;
        };
      } = await axiosInstance.get(`/friends/requests/${requestId}`);

      console.log(data);

      setFriendRequest(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/friends/requests/${requestId}/accept`
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
      } = await axiosInstance.get(`/profile`, {
        params: {
          filter: "chats friends friendRequests",
        },
      });

      setUserInfo({
        ...userInfo!,
        chats: data.data.chats,
        friendRequests: data.data.friendRequests,
        friends: data.data.friends,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/friends/requests/${requestId}/reject`
      );

      console.log(data);
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
          filter: "friendRequests",
        },
      });

      setUserInfo({
        ...userInfo!,
        friendRequests: data.data.friendRequests,
      });
      toast.success("Request Rejected");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFriendRequest();
  }, []);

  if (!friendRequest) return;

  return friendRequest.sender.username === userInfo?.username ? (
    <div className="h-[72px] w-full px-2 mb-1 animate-dropdownOpen">
      <div className="group h-full w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={friendRequest.recipient.profilePic}
            username={friendRequest.recipient.username}
          />
        </div>
        <div className="h-14 w-[90%] flex justify-between items-center">
          <p className="font-medium mt-1">
            {friendRequest.recipient?.username}
          </p>
          <p className="px-2 text-gray-500">{friendRequest.status}</p>
        </div>
      </div>
    </div>
  ) : friendRequest?.status === "pending" ? (
    <div className="h-[72px] w-full px-2 mb-1">
      <div className="group h-full w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={friendRequest.recipient.profilePic}
            username={friendRequest.recipient.username}
          />
        </div>
        <div className="h-14 w-[90%] flex justify-between items-center">
          <p className="font-medium mt-1">
            {friendRequest.recipient?.username}
          </p>

          <div>
            <button
              onClick={acceptFriendRequest}
              className="px-2 py-1 rounded-md font-semibold text-white text-sm bg-blue-600 active:scale-95 transition-all mr-2"
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
      </div>
    </div>
  ) : (
    <div className="h-[72px] w-full px-2 mb-1 animate-dropdownOpen">
      <div className="group h-full w-full hover:bg-gray-100 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic
            profilePic={friendRequest.recipient.profilePic}
            username={friendRequest.recipient.username}
          />
        </div>
        <div className="h-14 w-[90%] flex justify-between items-center">
          <p className="font-medium mt-1">
            {friendRequest.recipient?.username}
          </p>
          <p
            className={`${
              friendRequest?.status === "accepted"
                ? "text-emerald-500"
                : "text-red-600"
            }`}
          >
            {friendRequest.status}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
