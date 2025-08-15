"use client";

import { StoredMessage, UserInfo } from "@/Interface/definations";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { useUserInfoContext } from "./UserInfoContext";
import { fetchContactsFromChats } from "@/utils/ContactService";

type UserContactContext = {
  userContacts: UserInfo[] | [];
  // setUserContacts: Dispatch<SetStateAction<UserInfo[] | []>>;
  contactMessages: StoredMessage[] | [];
  setContactMessages: Dispatch<SetStateAction<StoredMessage[] | []>>;
  updateContactOnlineStatus: (contactId: string, isOnline: boolean) => void;
  // getChatMessages: (crid: string) => Promise<StoredMessage[] | []>;
  // getContactInfo: (contactId: string) => Promise<UserInfo | null>;
  selectedContact: UserInfo | null;
  setSelectedContact: Dispatch<SetStateAction<UserInfo | null>>;
};

const UserContactContext = createContext<UserContactContext | null>(null);

export default function UserContactContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { userInfo } = useUserInfoContext();

  const [contactMessages, setContactMessages] = useState<StoredMessage[] | []>(
    []
  );
  const [userContacts, setUserContacts] = useState<UserInfo[] | []>([]);
  const [selectedContact, setSelectedContact] = useState<UserInfo | null>(null);

  const fetchContacts = async () => {
    try {
      if (!Array.isArray(userInfo?.chats)) {
        console.warn("userInfo.chats is not an array or is undefined");
        return;
      }

      const contacts = await fetchContactsFromChats(userInfo.chats);
      setUserContacts(contacts);
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    }
  };

  const updateContactOnlineStatus = (contactId: string, isOnline: boolean) => {
    setUserContacts((prev) =>
      prev.map((contact) =>
        contact._id === contactId ? { ...contact, isOnline: isOnline } : contact
      )
    );
  };

 const  updateMessageStatus = ()=>{} 

  useEffect(() => {
    console.log("🚀 ~ UserContactContextProvider ~ userInfo:", userInfo);
    if (!userInfo) return;
    fetchContacts();
  }, [userInfo]);

  useEffect(() => {
    console.log(userContacts);
    console.log(
      "🚀 ~ UserContactContextProvider ~ userContacts length:",
      userContacts.length
    );
  }, [userContacts]);

  useEffect(() => {
    console.log(contactMessages);
  }, [contactMessages]);

  return (
    <UserContactContext.Provider
      value={{
        userContacts,
        // setUserContacts,
        contactMessages,
        setContactMessages,
        updateContactOnlineStatus,
        // getChatMessages,
        // getContactInfo,
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
