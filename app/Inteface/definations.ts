export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  about: string;
  profilePic: string;
  friendList: {
    contactId: string;
    roomId: string;
  }[];
  favouritesContactList: string[];
  followers: string[];
  following: string[];
  friendRequestList: string[];
  blacklist: string[];
  createdAt: string;
  updatedAt: string;
};

export type SendMessage = {
  _id?: string;
  action: "JOIN" | "LEAVE" | "MESSAGE" | "UPDATE";
  content?: string;
  room: string;
  sender?: string;
  receiver?: string;
};

export type StoredMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isPinned: boolean;
  isEdited: boolean;
  visibleToEveryone?: boolean;
  visibleToSender?: boolean;
  updatedAt?: string;
  createdAt?: string;
};
