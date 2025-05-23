"use client";

import { StoredMessage, UserInfo } from "@/app/Inteface/definations";
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
import toast from "react-hot-toast";

type UserContactContext = {
  userContact: UserInfo | null;
  setUserContact: Dispatch<SetStateAction<UserInfo | null>>;
  contactMessages: StoredMessage[] | [];
  setContactMessages: Dispatch<SetStateAction<StoredMessage[] | []>>;
  getChatMessages: (crid: string) => void;
  getContactInfo: (contactId: string) => Promise<UserInfo | null>;
};

const UserContactContext = createContext<UserContactContext | null>(null);

export default function UserContactContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contactMessages, setContactMessages] = useState<StoredMessage[] | []>(
    []
  );
  const [userContact, setUserContact] = useState<UserInfo | null>(null);

  useEffect(() => {
    console.log(userContact);
  }, [userContact]);

  useEffect(() => {
    console.log(contactMessages);
  }, [contactMessages]);

  const getChatMessages = async (crid: string) => {
    try {
      const response = await axiosInstance.get<{
        data: {
          messages: StoredMessage[];
        };
      }>(`/users/chats/${crid}/messages`);

      const messages = response.data?.data?.messages ?? [];

      console.log(messages);
      setContactMessages(messages);
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load messages");
      console.error(error);
    }
  };

  const getContactInfo = async (contactId: string) => {
    if (!contactId) return null;

    try {
      const response = await axiosInstance.get<{ data: UserInfo }>(
        `/users/friends/${contactId}`
      );

      const contact = response.data.data;

      console.log("Contact : ", contact);
      setUserContact(contact);
      return contact;
    } catch (error: any) {
      toast.error(error.response.data.error || "An error occured");
      return null;
    }
  };

  return (
    <UserContactContext.Provider
      value={{
        userContact,
        setUserContact,
        contactMessages,
        setContactMessages,
        getChatMessages,
        getContactInfo,
      }}
    >
      {children}
    </UserContactContext.Provider>
  );
}

export function useUserContactContext() {
  const context = useContext(UserContactContext);

  if (!context)
    throw new Error(
      "useUserContactContext must be used within a UserContactContextProvider"
    );

  return context;
}
