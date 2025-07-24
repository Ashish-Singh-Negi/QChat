"use client";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import ContactCard from "./components/ContactCard";
// import NavBar from "./components/NavBar";
// import Websocket from "./components/WebSocket";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import axiosInstance from "@/utils/axiosinstance";
import { FormEvent, useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { UserInfo } from "./Interface/definations";
import { useRoomContext } from "@/Context/RoomContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import ProfilePic from "./components/ProfilePic";
import HomeContactInfo from "./components/HomeContactInfo";

import { RiDeleteBin6Line, RiSendPlaneFill } from "react-icons/ri";
import Dropdown from "./components/Dropdown";
import Messages from "./components/Messages";
import { IoMdMore } from "react-icons/io";
import DropdownActionCard from "./components/DropdownActionCard";
import { FiMinusCircle } from "react-icons/fi";
import FriendCard from "./components/FriendCard";

export default function Home() {
  const { userInfo, getUserProfile } = useUserInfoContext();
  const { userContact, contactMessages } = useUserContactContext();
  const { roomId, sendMessage, messages, setMessages } = useWebSocketContext();
  const { roomInfo } = useRoomContext();

  const [search, setSearch] = useState("");

  const [textMessage, setTextMessage] = useState<string | null>(null);

  const [openContactInfo, setOpenContactInfo] = useState(false);

  const chatContainerRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdown, setDropdown] = useState(false);

  const dropdownActions = [
    {
      name: "Clear chat",
      Icon: FiMinusCircle,
      action: async () => {
        try {
          await axiosInstance.delete(`/chats/${roomId}/clear`);
          toast.success("Chat cleared");
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      name: "Delete chat",
      Icon: RiDeleteBin6Line,
      action: () => {
        // console.log(" DELETE  ", message.content);
        toast.error("Coming soon");
      },
    },
  ];

  useEffect(() => {
    console.log("Scroll Height : ", chatContainerRef.current?.scrollHeight);

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    console.log("Scroll Top : ", chatContainerRef.current?.scrollTop);

    console.log("messages : ", messages);
  }, [messages]);

  const sendFriendRequestHandler = async () => {
    try {
      const response = await axiosInstance.post<{
        data: UserInfo;
        message: string;
      }>(`/friends/requests`, {
        friendUsername: userContact?.username,
      });

      console.log(response.data.data);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.error(error);
    }
  };

  const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textMessage?.trim()) return;

    sendMessage({
      action: "MESSAGE",
      content: textMessage.trim(),
      room: roomId!,
      sender: userInfo!._id,
      receiver: userContact?._id,
    });

    setTextMessage(null);
  };

  const disappearMessagesAboveDurationHandler = async () => {
    try {
      await axiosInstance.delete(`/chats/${roomId}/messages/disappear`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  useEffect(() => {
    if (contactMessages) setMessages(contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    if (!roomInfo || !roomId) return;

    if (roomInfo.disappearingMessages !== "OFF") {
      disappearMessagesAboveDurationHandler();
    }
  }, [roomInfo]);

  useEffect(() => {
    console.log(userContact);
  }, [userContact]);

  useEffect(() => {
    console.log("MESSAGES : ", messages);
  }, [messages]);

  return (
    <>
      {/* <Websocket /> */}
      <Toaster position="bottom-left" />
      <main className="h-full w-full flex overflow-hidden">
        {/* <NavBar /> */}
        <nav className="h-full w-16 dark:bg-black border-r-[1px] dark:border-gray-800 "></nav>

        <section className="h-full w-[30%] flex flex-col border-r-[1px] dark:border-gray-800 dark:bg-black ">
          <header className="px-4 py-2 mb-2">
            <h1 className="font-semibold text-4xl">
              <span className="text-red-500">Q</span>Chat
            </h1>
          </header>
          <div className="px-4">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="h-10 w-full rounded-2xl bg-gray-100 dark:bg-gray-900 outline-none border-2 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-900 focus:border-red-300 placeholder:text-gray-600 dark:placeholder:text-gray-400 dark:focus:border-red-300 px-4 py-1 transition-all"
              placeholder="Search friend"
            />
          </div>
          <main className="flex-1 w-full mt-2 py-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-800">
            {!search &&
              userInfo &&
              userInfo.chats.map((chat) => (
                <ContactCard
                  key={chat.id}
                  roomId={chat.id}
                  sendMessage={sendMessage}
                />
              ))}
            {search && (
              <>
                <p className="h-8 w-full bg-gray-200 dark:bg-gray-800 px-4 py-1 mb-2 animate-slideIn">
                  Friends
                </p>
                {userInfo?.friends
                  .filter((friend) =>
                    friend.name.toLowerCase().startsWith(search.toLowerCase())
                  )
                  .map((friend) => (
                    <FriendCard friendId={friend.id} key={friend.name} />
                  ))}
              </>
            )}
          </main>
        </section>
        {roomId && (
          <section className="bg-[url(./public/background.png)] dark:bg-[url(./public/dark-background.png)] bg-cover h-full w-2/3 flex">
            <div className="h-full w-full flex flex-col border-r-[1px] dark:border-gray-800">
              <header className="h-16 w-full bg-white dark:bg-black px-2 pr-4 flex items-center justify-between">
                {userContact && (
                  <div
                    onClick={() => setOpenContactInfo(true)}
                    className="h-16 w-full font-semibold px-2 flex items-center gap-4 transition-all text-black dark:text-white cursor-pointer"
                  >
                    <div className="h-10 w-10 text-xl">
                      <ProfilePic
                        profilePic={userContact.profilePic!}
                        username={userContact.username!}
                      />
                    </div>
                    {userContact.username}
                  </div>
                )}
                <div
                  ref={dropdownRef}
                  onClick={() => setDropdown(!dropdown)}
                  className={`relative h-10 w-10 cursor-pointer ${
                    dropdown && "bg-gray-200 dark:bg-gray-900"
                  } hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors flex items-center justify-center rounded-full`}
                >
                  <IoMdMore className="h-6 w-6" />
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
                {/* <div className="h-full overflow-y-auto px-10"> */}
                <Messages messages={messages!} />

                {roomInfo?.isDisabled && (
                  <div className="h-14 w-full flex flex-col gap-2 items-center">
                    <p className="w-full text-center px-4 py-1 bg-gray-800 text-white">
                      you and {userContact?.username} are no longer friends. To
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
                        <RiSendPlaneFill className="inline mt-1 h-3 w-3" />
                      </button>
                    </div>
                  </div>
                )}
                {/* </div> */}
              </main>
              <footer className="h-14 w-full px-4 flex items-center bg-transparent mb-1">
                {roomInfo?.isDisabled ? (
                  <div className="h-12 w-full flex items-center bg-gray-200 dark:bg-gray-900 opacity-50 rounded-3xl px-1">
                    <input
                      type="text"
                      disabled
                      className="h-8 w-full cursor-not-allowed rounded-2xl outline-none bg-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400  px-4 py-2 transition-all"
                      placeholder="Type a message"
                    />
                    <button className="p-2 cursor-not-allowed flex justify-center items-center bg-gray-500 rounded-full text-white font-medium">
                      <RiSendPlaneFill className="inline h-6 w-6" />
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={sendMessageHandler}
                    className="h-12 w-full flex items-center bg-white dark:bg-gray-900 rounded-3xl px-1"
                  >
                    <input
                      type="text"
                      value={textMessage || ""}
                      onChange={(e) => setTextMessage(e.target.value)}
                      className="h-8 w-full rounded-2xl outline-none bg-transparent caret-red-500 placeholder:text-gray-600 dark:placeholder:text-gray-400 px-4 py-2 transition-all"
                      placeholder="Type a message"
                    />
                    <button className="p-2 flex justify-center items-center bg-red-500 rounded-full text-white font-medium active:scale-95 transition-all">
                      <RiSendPlaneFill className="inline h-6 w-6" />
                    </button>
                  </form>
                )}
              </footer>
            </div>
            {openContactInfo && (
              <HomeContactInfo setOpenContactInfo={setOpenContactInfo} />
            )}
          </section>
        )}
      </main>
    </>
  );
}
