"use client";

import { UserInfo } from "@/app/Inteface/definations";
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

  return (
    <UserInfoContext.Provider
      value={{
        userInfo,
        setUserInfo,
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
