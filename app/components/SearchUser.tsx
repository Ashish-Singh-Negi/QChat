import React, { useState } from "react";
import { UserInfo } from "../Inteface/definations";
import axiosInstance from "@/utils/axiosinstance";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";

const SearchUser = () => {
  const { userInfo } = useUserInfoContext();

  const [usernameFounded, setUsernameFounded] = useState<UserInfo[] | null>(
    null
  );
  const [noUsernameFound, setNoUsernameFound] = useState(false);

  const searchUsername = async (username: string) => {
    try {
      if (!username) {
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
      setNoUsernameFound(false);
      setUsernameFounded(data.data);
    } catch (error) {
      console.error(error);
      setUsernameFounded(null);
      setNoUsernameFound(true);
    }
  };

  const sendFriendRequestHandler = async (username: string) => {
    try {
      const { data } = await axiosInstance.patch("/users/friends/request", {
        friendUsername: username,
      });

      console.log(data);
      toast.success("Friend request sended");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-60 py-1 px-2 mx-2 mb-4">
      <h1 className="h-8 w-full text-lg flex items-center font-medium mb-2 border-l-2 border-gray-400 dark:border-white px-2 text-black dark:text-white">
        Search
      </h1>
      <div className="w-full flex items-center">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setTimeout(() => {
              searchUsername(e.target.value);
            }, 1000);
          }}
          className="h-10 w-80 rounded-l-md pl-2 font-normal outline-none border-2 border-gray-400 dark:border-black dark:bg-black focus:border-blue-500 transition-all"
        />
        <MdOutlineSearch className="inline h-10 w-10 p-2 cursor-pointer bg-blue-600 text-white rounded-r-md" />
      </div>
      <main className="h-40 w-full overflow-y-auto mt-1">
        {noUsernameFound && <p className="mt-2 text-sm text-center">No user found</p>}
        {usernameFounded &&
          usernameFounded.map((user) => {
            if (userInfo?.username !== user.username)
              return (
                <div key={user.username} className="my-2">
                  <div className="w-full flex items-center gap-2 border-l-2 border-blue-500 pl-2 py-1 mb-2 ">
                    <p className="w-full font-medium">{user.username}</p>
                    <button
                      onClick={() => sendFriendRequestHandler(user.username)}
                      className="flex items-center cursor-pointer gap-1 px-4 py-1 rounded-md font-semibold text-white bg-blue-600 active:scale-95 transition-all"
                    >
                      send <RiSendPlaneFill className="inline mt-1 h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
          })}
      </main>
    </div>
  );
};

export default SearchUser;
