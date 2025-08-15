"use client";

import { Room, StoredMessage } from "@/Interface/definations";
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
import { fetchAllChats } from "@/utils/ChatService";
import toast from "react-hot-toast";
import { useUserContactContext } from "./UserContactContext";

type ChatsContext = {
  chats: Room[] | null;
  setChats: Dispatch<SetStateAction<Room[] | null>>;
  chatsMessagesMap: Map<string, StoredMessage[]>;
  addMessageToChatsMessagesMap: (key: string, message: StoredMessage) => void;
  updateMessageStatus: (
    key: string,
    id: string,
    status: "SEND" | "DELIVERED" | "SEEN"
  ) => void;
  selectedChat: Room | null;
  setSelectedChat: Dispatch<SetStateAction<Room | null>>;
  setCurrentChatId: (chatId: string) => void;
};

const ChatsContext = createContext<ChatsContext | null>(null);

export default function ChatsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { userInfo } = useUserInfoContext();
  const { setContactMessages, setSelectedContact, userContacts } =
    useUserContactContext();

  const [chats, setChats] = useState<Room[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [chatsMessagesMap, setChatsMessagesMap] = useState<
    Map<string, StoredMessage[]>
  >(new Map());

  const addMessageToChatsMessagesMap = (
    key: string,
    message: StoredMessage
  ) => {
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap); // clone the prev Map

      const chatMessages = prevMap.get(key) ?? [];
      const updatedChatMessages = [...chatMessages, message];

      newMap.set(key, updatedChatMessages);
      return newMap;
    });
  };

  const fetchChats = async () => {
    try {
      if (!Array.isArray(userInfo?.chats)) {
        console.warn("userInfo.chats is not an array or is undefined");
        return;
      }

      const chatIds = userInfo.chats.map((chat) => chat.chatId);

      const validChats = await fetchAllChats(chatIds);

      setChats(validChats);
    } catch (error) {
      toast.error("Failed to fetch chats");
      console.error("fetchChats error:", error);
    }
  };

  const updateMessageStatus = (
    key: string,
    id: string,
    status: "SEND" | "DELIVERED" | "SEEN"
  ) => {
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap);

      const messages = prevMap.get(key);
      if (!messages) return prevMap;

      const updatedMessage = messages.map((message) =>
        message._id === id ? { ...message, status: status } : message
      );

      newMap.set(key, updatedMessage);
      return newMap;
    });
  };

  const setCurrentChatId = (chatId: string) => {
    if (!chatId) return;

    const chat = chats?.find((chat) => chat._id === chatId);
    const contactId = chat?.participants.find(
      (participant) => participant !== userInfo?._id && participant
    );

    if (chat) setSelectedChat(chat);

    if (!contactId) return;

    const contactInfo = userContacts.find(
      (contact) => contact._id === contactId && contact
    );

    if (!contactInfo) {
      console.error("Contact not found in contactInfo Refresh page");
      return;
    }

    setSelectedContact(contactInfo);

    const messages = chatsMessagesMap.get(chatId);
    if (messages) setContactMessages(messages);
  };

  useEffect(() => {
    if (!userInfo) return;
    fetchChats();
  }, [userInfo]);

  useEffect(() => {
    if (!chats || !chats.length) return;
    console.log("🚀 ~ ChatsContextProvider ~ chats:", chats);

    const messagesMap = new Map<string, StoredMessage[]>();

    chats.forEach((chat) => {
      messagesMap.set(chat._id, chat.messages);
    });

    setChatsMessagesMap(messagesMap); // set once with full map
  }, [chats]);

  useEffect(() => {
    const newMessages = chatsMessagesMap.get(selectedChat?._id!);
    if (newMessages) setContactMessages(newMessages);
  }, [chatsMessagesMap]);

  return (
    <ChatsContext.Provider
      value={{
        chats,
        setChats,
        chatsMessagesMap,
        addMessageToChatsMessagesMap,
        updateMessageStatus,
        selectedChat,
        setSelectedChat,
        setCurrentChatId,
      }}
    >
      {children}
    </ChatsContext.Provider>
  );
}

export function useChatsContext() {
  const context = useContext(ChatsContext);

  if (!context)
    throw new Error("useChatsContext must be used within ChatsContextProvider");

  return context;
}
