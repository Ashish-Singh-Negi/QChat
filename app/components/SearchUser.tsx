import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosinstance";

import { UserInfo } from "../../Interface/definations";

import { useUserInfoContext } from "@/Context/UserInfoContext";

import ProfilePic from "./ProfilePic";
import { Send } from "lucide-react";

const SearchUser = () => {
  const { userInfo } = useUserInfoContext();

  const [searchUsername, setSearchUsername] = useState("");
  const [usernameFounded, setUsernameFounded] = useState<UserInfo[] | null>(
    null
  );
  const [noUsernameFound, setNoUsernameFound] = useState(false);

  const getUsersByUsername = async (username: string) => {
    try {
      if (!username.trim()) {
        setUsernameFounded(null);
        setNoUsernameFound(false);
        return;
      }

      const {
        data,
      }: {
        data: {
          data: UserInfo[];
        };
      } = await axiosInstance.get(`users`, {
        params: {
          username: username.toLocaleLowerCase().trim(),
        },
      });

      console.log(data.data);

      if (!data.data.length) setNoUsernameFound(true);
      else setNoUsernameFound(false);
      setUsernameFounded(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFriendRequestHandler = async (username: string) => {
    try {
      const { data } = await axiosInstance.post("/friends/requests", {
        friendUsername: username,
      });

      console.log(data);
      toast.success("Friend request send");
    } catch (error: any) {
      toast.error(error.response.data.error);
      console.error(error);
    }
  };

  useEffect(() => {
    getUsersByUsername(searchUsername);
  }, [searchUsername]);

  return (
    <>
      <div className="h-20 w-full px-4 py-1 flex items-center">
        <input
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          className="h-10 w-full rounded-2xl bg-gray-100 dark:bg-gray-900 outline-none border-2 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-900 focus:border-red-300 placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-red-300 px-4 py-1 transition-all"
          type="text"
          placeholder="Search with username"
        />
      </div>
      {noUsernameFound && (
        <p className="mt-2 text-sm text-center">
          No User found for{" "}
          <span className="text-black dark:text-white">
            &quot;{searchUsername}&quot;
          </span>
        </p>
      )}
      {usernameFounded &&
        usernameFounded.map((user) => {
          if (userInfo?.username !== user.username)
            return (
              <div
                key={user._id + user.username}
                className="h-[72px] w-full px-2 mb-1"
              >
                <div className="h-full w-full hover:bg-gray-200 dark:hover:bg-gray-900 rounded-lg flex items-center px-2 py-2 gap-4">
                  <div className="h-14 w-14 text-2xl">
                    <ProfilePic
                      profilePic={user.profilePic}
                      username={user.username}
                    />
                  </div>
                  <div className="h-14 w-[90%] flex items-center justify-between">
                    <p className="font-medium mt-1">{user?.username}</p>
                    <button
                      onClick={() => sendFriendRequestHandler(user.username)}
                      className="h-8 flex items-center cursor-pointer gap-1 px-4 py-1 rounded-md font-semibold text-white bg-red-600 active:scale-95 transition-all"
                    >
                      send <Send className="inline mt-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
        })}
    </>
  );
};

export default SearchUser;
