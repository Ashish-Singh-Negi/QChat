"use client";

import { UserInfo } from "@/Interface/definations";
import axiosInstance from "@/utils/axiosinstance";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type UserInfoContext = {
  userInfo: UserInfo | null;
  setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
  getUserProfile: () => void;
};

const UserInfoContext = createContext<UserInfoContext | null>(null);

export default function UserInfoContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get<{ data: UserInfo }>(
        `/users/profile`
      );

      console.log(response.data.data);

      setUserInfo(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
        getUserProfile,
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

export function useUserInfoContext() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error(
      "useUserInfoContext must be used within a UserInfoContextProvider"
    );
  }

  return context;
}
