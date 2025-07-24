import React, { useEffect, useState } from "react";
import { UserInfo } from "../Interface/definations";
import axiosInstance from "@/utils/axiosinstance";
import { RiSendPlaneFill } from "react-icons/ri";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import toast from "react-hot-toast";

const SearchUser = ({ username }: { username: string }) => {
  const { userInfo } = useUserInfoContext();

  const [usernameFounded, setUsernameFounded] = useState<UserInfo[] | null>(
    null
  );
  const [noUsernameFound, setNoUsernameFound] = useState(false);

  const getUsersByUsername = async (username: string) => {
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
    getUsersByUsername(username);

    console.log(" Username ", username);
  }, [username]);

  return (
    <>
      {" "}
      {noUsernameFound && (
        <p className="mt-2 text-sm text-center">No user found</p>
      )}
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
    </>
  );
};

export default SearchUser;
