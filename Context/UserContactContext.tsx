"use client";

import { StoredMessage, UserInfo } from "@/Interface/definations";
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
  userContacts: Contacts[] | [];
  setUserContacts: Dispatch<SetStateAction<Contacts[] | []>>;
  contactMessages: StoredMessage[] | [];
  setContactMessages: Dispatch<SetStateAction<StoredMessage[] | []>>;
  getChatMessages: (crid: string) => Promise<StoredMessage[] | []>;
  getContactInfo: (contactId: string) => Promise<UserInfo | null>;
  selectedContact: number;
  setSelectedContact: Dispatch<SetStateAction<number>>;
};

interface Contacts extends UserInfo {
  messages: StoredMessage[] | [];
}

const UserContactContext = createContext<UserContactContext | null>(null);

export default function UserContactContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [contactMessages, setContactMessages] = useState<StoredMessage[] | []>(
    []
  );
  const [userContacts, setUserContacts] = useState<Contacts[] | []>([]);
  const [selectedContact, setSelectedContact] = useState(-1);

  useEffect(() => {
    console.log(userContacts);

    console.log(selectedContact);
  }, [userContacts]);

  useEffect(() => {
    console.log(contactMessages);
  }, [contactMessages]);

  const getChatMessages = async (crid: string) => {
    try {
      const response = await axiosInstance.get<{
        data: StoredMessage[];
      }>(`/chats/${crid}/messages`);

      console.log(response);

      const messages = response.data?.data ?? [];

      console.log(messages);
      setContactMessages(messages);
      return messages;
    } catch (error: any) {
      toast.error(error?.response?.data?.error || "Failed to load messages");
      console.error(error);
      return [];
    }
  };

  const getContactInfo = async (contactId: string) => {
    console.log(contactId);
    if (!contactId) return null;

    try {
      const response = await axiosInstance.get<{ data: UserInfo }>(
        `/friends/${contactId}`
      );

      console.log(response);

      const contact = response.data.data;

      console.log("Contact : ", contact);
      return contact;
    } catch (error: any) {
      toast.error(error.response.data.error || "An error occured");
      return null;
    }
  };

  return (
    <UserContactContext.Provider
      value={{
        userContacts,
        setUserContacts,
        contactMessages,
        setContactMessages,
        getChatMessages,
        getContactInfo,
        selectedContact,
        setSelectedContact,
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
