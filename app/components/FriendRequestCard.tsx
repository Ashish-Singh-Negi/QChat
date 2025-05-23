import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";
import { FriendRequest, UserInfo } from "../Inteface/definations";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";

const FriendRequestCard = ({ requestId }: { requestId: string }) => {
  const [friendRequest, setFriendRequest] = useState<FriendRequest | null>(
    null
  );

  const { userInfo, setUserInfo } = useUserInfoContext();

  const getFriendRequest = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: FriendRequest;
        };
      } = await axiosInstance.get(`/users/friends/requests/${requestId}`);

      console.log(data);

      setFriendRequest(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const acceptFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/users/friends/requests/${requestId}/accept`
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
          filter: "contactRoomList friendRequestList friendList",
        },
      });

      setUserInfo({
        ...userInfo!,
        contactRoomList: data.data.contactRoomList,
        friendRequestList: data.data.friendRequestList,
        friendList: data.data.friendList,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const rejectFriendRequest = async () => {
    try {
      const { data } = await axiosInstance.patch(
        `/users/friends/requests/${requestId}/reject`
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
          filter: "friendRequestList",
        },
      });

      setUserInfo({
        ...userInfo!,
        friendRequestList: data.data.friendRequestList,
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

  return friendRequest?.sender.username === userInfo?.username ? (
    <div className="h-16 w-full border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full"
          src={friendRequest?.recipient.profilePic}
          alt=""
        />
        <p className="font-medium">{friendRequest?.recipient.username}</p>
      </div>
      <p
        className={`${
          friendRequest?.status === "pending"
            ? "text-blue-500"
            : friendRequest?.status === "accepted"
            ? "text-emerald-500"
            : "text-red-600"
        }`}
      >
        {friendRequest!.status}
      </p>
    </div>
  ) : friendRequest?.status === "pending" ? (
    <div className="h-16 w-full border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="w-fit flex items-center gap-2">
        {" "}
        <img
          src={friendRequest?.sender.profilePic}
          className="h-10 w-10 rounded-full"
          alt="pic"
        />
        <p className="font-medium dark:text-white">
          {friendRequest?.sender.username}
        </p>
      </div>
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
  ) : (
    <div className="h-16 w-full border-gray-300 dark:border-gray-700 flex items-center justify-between px-2">
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full"
          src={friendRequest?.sender.profilePic}
          alt="pic"
        />
        <p className="font-medium">{friendRequest?.sender.username}</p>
      </div>
      <p
        className={`${
          friendRequest?.status === "accepted"
            ? "text-emerald-500"
            : "text-red-600"
        }`}
      >
        {friendRequest!.status}
      </p>
    </div>
  );
};

export default FriendRequestCard;
