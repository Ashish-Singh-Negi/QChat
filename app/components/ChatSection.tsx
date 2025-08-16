import React, { useEffect, useRef, useState } from "react";
import { CircleMinus, EllipsisVertical, Send, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";
import { useChatsContext } from "@/Context/ChatsContext";
// import { useWebSocketContext } from "@/Context/WebsocketContext";

import { UserInfo } from "@/Interface/definations";

import ProfilePic from "./ProfilePic";
import Dropdown from "./Dropdown";
import DropdownActionCard from "./DropdownActionCard";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import HomeContactInfo from "./HomeContactInfo";

const ChatSection = () => {
  const { userContacts, contactMessages, selectedContact } =
    useUserContactContext();
  const { selectedChat } = useChatsContext();

  const [openContactInfo, setOpenContactInfo] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    console.log("messages : ", contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    console.log(selectedContact);
  }, [selectedContact]);

  const dropdownActions = [
    {
      name: "Clear chat",
      Icon: CircleMinus,
      action: async () => {
        try {
          await axiosInstance.delete(`/chats/${selectedChat!._id}/clear`);
          toast.success("Chat cleared");
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      name: "Delete chat",
      Icon: Trash2,
      action: () => {
        // console.log(" DELETE  ", message.content);
        toast.error("Coming soon");
      },
    },
  ];

  const sendFriendRequestHandler = async () => {
    try {
      const response = await axiosInstance.post<{
        data: UserInfo;
        message: string;
      }>(`/friends/requests`, {
        friendUsername: selectedContact!.username,
      });
      console.log(
        "🚀 ~ sendFriendRequestHandler ~ response.data.data :",
        response.data.data
      );

      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.error(error);
    }
  };

  return (
    selectedContact && (
      <section className="bg-[url('/background.png')] dark:bg-[url('/dark-background.png')] bg-cover h-full w-2/3 flex">
        <div className="h-full w-full flex flex-col border-r-[1px] dark:border-gray-800">
          <header className="h-16 w-full bg-white dark:bg-black px-2 pr-4 flex items-center justify-between">
            {userContacts && (
              <div
                onClick={() => setOpenContactInfo(true)}
                className="h-16 w-full font-semibold px-2 flex items-center gap-4 transition-all text-black dark:text-white cursor-pointer"
              >
                <div className="h-10 w-10 text-xl">
                  <ProfilePic
                    profilePic={selectedContact.profilePic!}
                    username={selectedContact.username!}
                  />
                </div>
                <div className="flex flex-col">
                  {selectedContact.username}
                  <span className="font-normal text-xs dark:text-gray-400 animate-dropdownOpen">
                    {selectedContact.isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            )}
            <div
              ref={dropdownRef}
              onClick={() => setDropdown(!dropdown)}
              className={`relative h-10 w-10 cursor-pointer ${
                dropdown && "bg-gray-200 dark:bg-gray-900"
              } hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors flex items-center justify-center rounded-full`}
            >
              <EllipsisVertical className="h-6 w-6" />
              {dropdown && (
                <Dropdown
                  dropdownRef={dropdownRef}
                  dropdown={dropdown}
                  setDropdown={setDropdown}
                  style="top-12 w-48"
                >
                  {dropdownActions.map((action) => (
                    <DropdownActionCard
                      name={action.name}
                      Icon={action.Icon}
                      action={action.action}
                      key={action.name}
                    />
                  ))}
                </Dropdown>
              )}
            </div>
          </header>
          <main
            ref={chatContainerRef}
            className="flex-1 flex flex-col-reverse w-full font-normal overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-800"
          >
            <Messages />

            {selectedChat!.isDisabled && (
              <div className="h-14 w-full flex flex-col gap-2 items-center">
                <p className="w-full text-center px-4 py-1 bg-gray-800 text-white">
                  you and {selectedContact.username} are no longer friends. To
                  start conversation again send friend request or
                  <br />
                  Delete the conversation
                </p>
                <div className="w-full flex gap-2">
                  <button className="h-10 w-full px-4 py-1 flex justify-center items-center gap-1 bg-red-600 text-white font-medium active:scale-x-95 transition-all">
                    Delete
                  </button>
                  <button
                    onClick={sendFriendRequestHandler}
                    className="h-10 w-full px-4 py-1 flex justify-center items-center gap-1 bg-blue-600 text-white font-medium active:scale-x-95 transition-all"
                  >
                    send
                    <Send className="inline mt-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            )}
          </main>
          <footer className="h-14 w-full px-4 flex items-center bg-transparent mb-1">
            <MessageInput />
          </footer>
        </div>
        {openContactInfo && (
          <HomeContactInfo setOpenContactInfo={setOpenContactInfo} />
        )}
      </section>
    )
  );
};

export default ChatSection;
