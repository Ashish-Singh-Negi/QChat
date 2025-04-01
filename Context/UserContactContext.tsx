"use client";

import {
  SendMessage,
  StoredMessage,
  UserInfo,
} from "@/app/Inteface/definations";
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

type UserContactContext = {
  userContact: UserInfo | null;
  setUserContact: Dispatch<SetStateAction<UserInfo | null>>;
  contactMessages: StoredMessage[] | [];
  setContactMessages: Dispatch<SetStateAction<StoredMessage[] | []>>;
  getChatRoomMessages: (id: string) => void;
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

  const getChatRoomMessages = async (id: string) => {
    try {
      const {
        data,
      }: {
        data: {
          data: {
            createdAt: string;
            isEdited: false;
            isPinned: false;
            content: string;
            receiverId: string;
            senderId: string;
            updatedAt: string;
            visibleToEveryone: true;
            visibleToSender: true;
            _id: "67dd0877061bf94408a51847";
          }[];
        };
      } = await axiosInstance.get("/users/chat/messages", {
        params: {
          crid: id, // crid -> chatRoomId
        },
      });

      console.log(data);
      setContactMessages(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContactContext.Provider
      value={{
        userContact,
        setUserContact,
        contactMessages,
        setContactMessages,
        getChatRoomMessages,
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
