export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  about: string;
  profilePic: string;
  isOnline: boolean;
  chats: { name: string; id: string }[] | [];
  friends: { name: string; id: string }[] | [];
  friendRequests: string[];
  // favouritesContactList: string[];
  // followers: string[];
  // following: string[];
  // starMessages: string[];
  // blacklist: string[];
  createdAt: string;
  updatedAt: string;
};

export type FriendRequest = {
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
};

export type SendMessage = {
  _id?: string;
  action: "JOIN" | "LEAVE" | "MESSAGE" | "UPDATE";
  content?: string;
  room: string;
  sender?: string;
  receiver?: string;
};

export type Room = {
  _id: string;
  participants: string[];
  pinMessages: string[];
  muteNotification: false;
  disappearingMessages: string;
  createdAt: string;
  updatedAt: string;
  isDisabled: boolean;
};

export type StoredMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  isPinned: boolean;
  isEdited: boolean;
  isStar: boolean;
  visibleToEveryone?: boolean;
  visibleToSender?: boolean;
  updatedAt?: string;
  createdAt?: string;
};
