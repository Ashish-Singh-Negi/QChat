import React, { useState } from "react";
import ProfilePic from "./ProfilePic";
import toast from "react-hot-toast";
import { Send } from "lucide-react";

import Spinner from "./Spinner";
import axiosInstance from "@/utils/axiosinstance";

const SearchUserCard = ({
  profilePicUrl,
  username,
}: {
  username: string;
  profilePicUrl: string;
}) => {
  const [isSended, setIsSended] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const sendFriendRequestHandler = async (username: string) => {
    try {
      setDisableBtn(true);
      await axiosInstance.post("/friends/requests", {
        friendUsername: username,
      });

      setTimeout(() => {
        toast.success("Friend request send", {
          position: "top-left",
        });
        setIsSended(true);
      }, 3000);
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
      setDisableBtn(false);
      setIsSended(false);
    }
  };

  return (
    <div className="h-[72px] w-full px-2 mb-1">
      <div className="h-full w-full hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
        <div className="h-14 w-14 text-2xl">
          <ProfilePic profilePic={profilePicUrl} username={username} />
        </div>
        <div className="h-14 w-[90%] flex items-center justify-between">
          <p className="font-medium mt-1">{username}</p>
          {isSended ? (
            <p className="text-blue-500 px-2">sended</p>
          ) : disableBtn ? (
            <button
              onClick={() => !disableBtn && sendFriendRequestHandler(username)}
              className={`h-8 flex items-center cursor-pointer gap-1 px-4 py-1 rounded-md font-semibold text-white active:scale-95 transition-all`}
            >
              <Spinner />
            </button>
          ) : (
            <button
              onClick={() => !disableBtn && sendFriendRequestHandler(username)}
              className={`h-8 flex items-center cursor-pointer gap-1 px-4 py-1 rounded-md font-semibold text-white bg-red-500 active:scale-95 transition-all`}
            >
              send <Send className="inline mt-1 h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchUserCard;
