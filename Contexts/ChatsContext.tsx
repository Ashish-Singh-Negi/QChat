"use client";

import { Chat, StoredMessage } from "@/types/definations";
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
  chats: Chat[] | null;
  chatsMessagesMap: Map<string, StoredMessage[]>;
  addMessageToChatsMessagesMap: (
    chatId: string,
    message: StoredMessage
  ) => void;
  addMessagesToChatsMessagesMap: (
    chatId: string,
    message: StoredMessage[]
  ) => void;
  updateMessageStatus: (
    chatId: string,
    id: string,
    status: "SEND" | "DELIVERED" | "SEEN"
  ) => void;
  updateMessagePinStatus: (
    chatId: string,
    id: string,
    isPinned: boolean
  ) => void;
  selectedChat: Chat | null;
  setSelectedChat: Dispatch<SetStateAction<Chat | null>>;
  setCurrentChatId: (chatId: string) => void;
};

const ChatsContext = createContext<ChatsContext | null>(null);

export default function ChatsContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { userInfo } = useUserInfoContext();
  const { setSelectedContact, userContacts } = useUserContactContext();

  const [chats, setChats] = useState<Chat[] | null>(null);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chatsMessagesMap, setChatsMessagesMap] = useState<
    Map<string, StoredMessage[]>
  >(new Map());
  // const [todayMessagesMap, setTodayMessagesMap] =
  //   useState<Map<string, StoredMessage[]>>(new Map());

  const addMessageToChatsMessagesMap = (
    chatId: string,
    message: StoredMessage
  ) => {
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap); // clone the prev Map

      const chatMessages = prevMap.get(chatId) ?? [];
      const updatedChatMessages = [message, ...chatMessages];

      newMap.set(chatId, updatedChatMessages);
      return newMap;
    });
  };

  const addMessagesToChatsMessagesMap = (
    chatId: string,
    messages: StoredMessage[]
  ) => {
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap); // clone the prev Map

      const chatMessages = prevMap.get(chatId) ?? [];
      const updatedChatMessages = [...chatMessages, ...messages];

      newMap.set(chatId, updatedChatMessages);
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
    chatId: string,
    id: string,
    status: "SEND" | "DELIVERED" | "SEEN"
  ) => {
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap);

      const messages = prevMap.get(chatId);
      if (!messages) return prevMap;

      const updatedMessage = messages.map((message) =>
        message._id === id ? { ...message, status: status } : message
      );

      newMap.set(chatId, updatedMessage);
      return newMap;
    });
  };

  const updateMessagePinStatus = (
    chatId: string,
    id: string,
    isPinned: boolean
  ) => {
    console.log(chatId, " ", id, " ", isPinned);
    setChatsMessagesMap((prevMap) => {
      const newMap = new Map(prevMap);

      const messages = prevMap.get(chatId);
      if (!messages) return prevMap;

      const updatedMessage = messages.map((message) =>
        message._id === id ? { ...message, isPinned: isPinned } : message
      );

      newMap.set(chatId, updatedMessage);
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

    // const messages = chatsMessagesMap.get(chatId);
    // if (messages) setContactMessages(messages);
  };

  useEffect(() => {
    if (!userInfo) return;
    fetchChats();
  }, [userInfo]);

  useEffect(() => {
    if (!chats || !chats.length) return;
    console.log("🚀 ~ ChatsContextProvider ~ chats:", chats);

    const messagesMap = new Map<string, StoredMessage[]>();
    // const chatMessagesPaginationMap = new Map<string, PaginationMeta>();

    chats.forEach((chat) => {
      messagesMap.set(chat._id, chat.messages);
      // chatMessagesPaginationMap.set(chat._id, messagesMap);
    });

    setChatsMessagesMap(messagesMap); // set once with full map
  }, [chats]);

  useEffect(() => {
    console.log(chatsMessagesMap);
  }, [chatsMessagesMap]);

  return (
    <ChatsContext.Provider
      value={{
        chats,
        chatsMessagesMap,
        addMessageToChatsMessagesMap,
        addMessagesToChatsMessagesMap,
        updateMessageStatus,
        updateMessagePinStatus,
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
