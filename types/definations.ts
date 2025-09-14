export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  about: string;
  profilePic: string;
  isOnline: boolean;
  chats: { name: string; contactId: string; chatId: string }[] | [];
  friends: { name: string; fid: string }[] | [];
  friendRequests: string[];
  // favouritesContactList: string[];
  // followers: string[];
  // following: string[];
  // starMessages: string[];
  // blacklist: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FriendRequest {
  _id: string;
  sender: {
    username: string;
    profilePic: string;
  };
  recipient: {
    username: string;
    profilePic: string;
  };
  status: "accepted" | "pending" | "rejected";
  sendAt: string;
  respondedAt: string;
}

export interface Message {
  action: "CHAT_MESSAGE";
  content: string;
  chatId: string;
  sender: string;
  receiver: string;
}

export interface OnlineStatusHeartbeat {
  action: "ONLINE_STATUS_HEARTBEAT";
  sender: string;
}

export interface CheckUserOnlineStatus {
  action: "CHECK_ONLINE_STATUS";
  receiver: string;
}

export interface AckMessage {
  action: "MESSAGE_DELIVERED_ACKNOWLEDGEMENT";
  _id: string;
  sender: string;
  chatId: string;
  status: MessageStatus;
}

export interface RoomMessage {
  action: "ROOM_MESSAGE";
  content: string;
}

export interface PinMessage {
  action: "PIN";
  chatId: string;
  _id: string;
  receiver: string;
  isPinned: boolean;
}

export interface Chat {
  _id: string;
  participants: string[];
  messages: StoredMessage[] | [];
  pinMessages: string[];
  muteNotification: false;
  disappearingMessages: string;
  createdAt: string;
  updatedAt: string;
  isDisabled: boolean;
}

export type MessageStatus = "SEND" | "DELIVERED" | "SEEN";

export interface StoredMessage {
  _id: string;
  senderId: string;
  receiverId: string;
  chatId: string;
  content: string;
  isPinned: boolean;
  isEdited: boolean;
  isStar: boolean;
  visibleToEveryone?: boolean;
  visibleToSender?: boolean;
  status: MessageStatus;
  updatedAt?: string;
  createdAt?: string;
}

export interface ParsedMessage {
  action:
    | "CHAT_MESSAGE"
    | "ONLINE_STATUS_HEARTBEAT"
    | "CHECK_ONLINE_STATUS"
    | "MESSAGE_DELIVERED_ACKNOWLEDGEMENT";
  _id: string;
  sender: string;
  receiver: string;
  chatId: string;
  content: string;
  createdAt: string;
  isOnline: boolean;
  status: MessageStatus;
}

export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
  nextPage: number | null;
  prevPage: number | null;
}

export type Theme = "DARK" | "LIGHT";
