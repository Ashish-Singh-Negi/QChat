import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { UserInfo } from "../../types/definations";

import { useUserInfoContext } from "@/Contexts/UserInfoContext";

import SearchUserCard from "./SearchUserCard";

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
              <SearchUserCard
                key={user._id + user.username}
                profilePicUrl={user.profilePic}
                username={user.username}
              />
            );
        })}
    </>
  );
};

export default SearchUser;
