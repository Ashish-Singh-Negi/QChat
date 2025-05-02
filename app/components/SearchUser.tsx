import React, { useState } from "react";
import { UserInfo } from "../Inteface/definations";
import axiosInstance from "@/utils/axiosinstance";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { useUserInfoContext } from "@/Context/UserInfoContext";

const SearchUser = () => {
  const { userInfo } = useUserInfoContext();

  const [usernameFounded, setUsernameFounded] = useState<UserInfo[] | null>(
    null
  );

  const searchUsername = async (username: string) => {
    try {
      if (!username) {
        setUsernameFounded(null);
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
          username: username.trim(),
        },
      });

      console.log(data.data);

      setUsernameFounded(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFriendRequestHandler = async (username: string) => {
    try {
      const { data } = await axiosInstance.patch("/users/friends/request", {
        friendUsername: username,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-60 py-1 px-2 mx-2 border-l-2 border-black mb-4">
      <h1 className="font-medium mb-2 border-l-2 border-white px-2 text-white">
        Send friend request
      </h1>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setTimeout(() => {
              searchUsername(e.target.value);
            }, 1000);
          }}
          className="h-8 w-80 rounded-l-md pl-2 font-normal outline-none border-black bg-black focus:border-2 focus:border-blue-500 transition-all"
        />
        <MdOutlineSearch className="inline h-8 w-8 p-1 cursor-pointer bg-black rounded-r-md" />
      </div>
      <main className="h-40 w-full overflow-y-auto mt-1">
        {usernameFounded &&
          usernameFounded.map((user) => {
            if (userInfo?.username !== user.username)
              return (
                <div key={user.username} className="my-2">
                  <div className="w-full flex items-center gap-2 border-l-2 border-blue-500 pl-2 py-1 mb-2 ">
                    <p className="w-full font-medium">{user.username}</p>
                    <button
                      onClick={() => sendFriendRequestHandler(user.username)}
                      className="flex items-center cursor-pointer gap-1 px-4 py-[2px] rounded-md font-semibold text-white bg-blue-800 active:scale-95 transition-all"
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
