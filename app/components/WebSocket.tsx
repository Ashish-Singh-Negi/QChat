"use client";

import axiosInstance from "@/utils/axiosinstance";
import React, { FormEvent, useEffect, useRef, useState } from "react";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";
import { useRoomContext } from "@/Context/RoomContext";

import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";
// import StarMessageCard from "./StarMessageCard";
import FriendRequestCard from "./FriendRequestCard";
import Profile from "./Profile";
import SearchUser from "./SearchUser";
import RoomMessageCard from "./RoomMessageCard";
import ContactCard from "./ContactCard";

import { RiSendPlaneFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import toast, { Toaster } from "react-hot-toast";

import { UserInfo } from "../Inteface/definations";

const Websocket = () => {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { userContact, contactMessages } =
    useUserContactContext();
  const { isConnected, roomId, sendMessage, messages, setMessages } =
    useWebSocketContext();
  const { roomInfo } = useRoomContext();

  const [textMessage, setTextMessage] = useState<string | null>(null);

  const [viewFullImage, setViewFullImage] = useState(false);

  const [muteNotifications, setMuteNotifications] = useState(false);

  const [disappearingMessagesDuration, setDisappearingMessagesDuration] =
    useState("OFF");

  const [chatInfo, setChatInfo] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("Scroll Height : ", chatRef.current?.scrollHeight);

    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }

    console.log("Scroll Top : ", chatRef.current?.scrollTop);

    console.log("messages : ", messages);
  }, [messages]);

  const getProfile = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
        };
      } = await axiosInstance.get(`/users/profile`);
      console.log(data.data);

      setUserInfo(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sendFriendRequestHandler = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: UserInfo;
          message: string;
        };
      } = await axiosInstance.patch(`/users/friends/request`, {
        friendUsername: userContact?.username,
      });

      console.log(data);
      toast.success(data.message);
    } catch (error) {
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

  const deleteMessageForMeHandler = async (mid: string) => {
    try {
      await axiosInstance.patch(`/users/chats/messages/${mid}/deleteforme`);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });

    // const updatedMessages = messages?.map((mess) => {
    //   if (mess._id === mid) {
    //     mess.content = "You deleted this message";
    //   } else mess;

    //   return mess;
    // });
    // setMessages(updatedMessages!);
  };

  const deleteMessageForEveryoneHandler = async (mid: string) => {
    try {
      console.log("MID : ", mid);
      await axiosInstance.patch(
        `/users/chats/messages/${mid}/deleteforeveryone`
      );
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });

    // const updatedMessages = messages?.map((mess) => {
    //   if (mess._id === mid) {
    //     mess.content = "You deleted this message";
    //   } else mess;

    //   return mess;
    // });
    // setMessages(updatedMessages!);
  };

  const deleteChatMessagesHandler = async () => {
    try {
      await axiosInstance.delete(`/users/chats/${roomId}/messages`);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });

    // const updatedMessages = messages?.map((mess) => {
    //   if (mess._id === mid) {
    //     mess.content = "You deleted this message";
    //   } else mess;

    //   return mess;
    // });
    // setMessages(updatedMessages!);
  };

  const pinMessageHandler = async (mid: string) => {
    console.log("PIN mid : ", mid);

    try {
      const { data } = await axiosInstance.patch("/users/chats/messages", {
        action: "PIN",
        crid: roomId,
        mid: mid,
        isPinned: false,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });

    // const updatedMessages = messages?.map((message) => {
    //   if (message._id === mid) {
    //     message.isPinned = !message.isPinned;
    //   }

    //   return message;
    // });

    // console.log(updatedMessages);

    // setMessages(updatedMessages!);
  };

  const starMessageHandler = async (mid: string) => {
    console.log("Star MID : ", mid);

    try {
      const { data } = await axiosInstance.patch("/users/chats/messages", {
        action: "STAR",
        mid: mid,
        uid: userInfo?._id,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });

    const index = userInfo?.starMessages.indexOf(mid);

    if (index! > -1) userInfo?.starMessages.splice(index!, 1);
    else userInfo?.starMessages.push(mid);
  };

  // Actions Btns
  const btnActionName = ["DFE", "DFM", "DCM", "PIN", "STAR"];

  const btnActions = [
    deleteMessageForEveryoneHandler,
    deleteMessageForMeHandler,
    deleteChatMessagesHandler,
    pinMessageHandler,
    starMessageHandler,
  ];

  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const changeBtnActionHandler = (actionName: string, index: number) => {
    console.log(actionName);
    setCurrentActionIndex(index);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (contactMessages) setMessages(contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    console.log("MESSAGES : ", messages);
  }, [messages]);

  return (
    <div className="h-full w-full ">
      <Toaster position="bottom-left" />
      <header className="h-fit w-full flex justify-between px-2 py-1 pt-2">
        <div className="">
          {" "}
          <h1>WebSocket Demo</h1>
          <p>
            Status :{" "}
            <span
              className={`font-medium ${
                isConnected ? "text-green-400" : "text-red-600"
              }`}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </p>
        </div>
        <Profile />
      </header>
      <main className="h-full w-full flex justify-between gap-2 border-t-2 border-black my-2 py-2 overflow-x-auto">
        <div className="flex gap-2">
          <div className="px-2">
            <p className="font-medium text-xl mb-1">Contacts</p>
            {userInfo &&
              userInfo.contactList.map((friend) => (
                <ContactCard
                  key={friend.contactId}
                  contactId={friend.contactId}
                  roomId={friend.roomId}
                  // setMessages={setMessages}
                  sendMessage={sendMessage}
                />
              ))}
          </div>
          {roomId && (
            <main className="h-[800px] w-[920px] flex">
              {" "}
              <section className="h-full w-full flex flex-col gap-1 border-x-2 border-black px-2 transition-transform ">
                <div className="h-10 w-full bg-black">
                  {btnActionName.map((actionName, index) => (
                    <button
                      key={actionName}
                      onClick={() => changeBtnActionHandler(actionName, index)}
                      className={`px-3 py-1 ${
                        currentActionIndex === index &&
                        " border-blue-600 text-blue-300 "
                      } active:scale-90 active:border-blue-500 transition-all`}
                    >
                      {actionName}
                    </button>
                  ))}
                </div>
                <div className="h-full w-full bg-black rounded-lg flex flex-col mt-2">
                  <header
                    onClick={() => setChatInfo(true)}
                    className="h-14 w-full font-semibold px-2 flex items-center gap-2  border-b-2 border-gray-700 cursor-pointer"
                  >
                    <img
                      src={
                        userContact?.profilePic ? userContact.profilePic : ""
                      }
                      className="h-8 w-8 rounded-full cursor-pointer"
                      alt=""
                    />
                    {userContact?.username}
                  </header>
                  <main
                    ref={chatRef}
                    className="h-[640px] w-full flex flex-col gap-1 py-1 font-normal overflow-y-auto"
                  >
                    {messages?.map((message) => {
                      if (!message.senderId)
                        return (
                          <RoomMessageCard
                            message={message.content}
                            key={message._id}
                          />
                        );
                      else
                        return message.senderId === userInfo?._id ? (
                          <SenderMessageCard
                            key={message._id}
                            message={message}
                            actionsHandler={btnActions[currentActionIndex]}
                          />
                        ) : (
                          <ReceiverMessageCard
                            message={message}
                            key={message._id}
                          />
                        );
                    })}
                    {roomInfo?.isDisabled && (
                      <button
                        onClick={sendFriendRequestHandler}
                        className="px-4 py-1 flex justify-center items-center gap-1 bg-blue-600 font-medium active:scale-x-95 transition-all"
                      >
                        send <RiSendPlaneFill className="inline mt-1 h-3 w-3" />
                      </button>
                    )}
                  </main>
                  <footer className="h-14 w-full border-t-2 border-gray-700 bg-gray-950 flex items-center px-2 py-2">
                    <div className="h-fit w-full">
                      {roomInfo?.isDisabled ? (
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Type a message"
                            disabled
                            className="h-8 w-full px-2 outline-none rounded-lg"
                          />
                          <button className="flex items-center px-4 py-1 bg-gray-600 rounded-lg ml-2 font-semibold active:scale-95">
                            <RiSendPlaneFill className="inline h-5 w-5" />
                          </button>
                        </div>
                      ) : (
                        <form className="flex" onSubmit={sendMessageHandler}>
                          <input
                            type="text"
                            placeholder="Type a message"
                            value={textMessage || ""}
                            onChange={(e) => setTextMessage(e.target.value)}
                            className="h-8 w-full px-2 outline-none rounded-lg bg-black focus:border-2 focus:border-blue-600"
                          />
                          <button className="flex items-center px-4 py-1 bg-blue-600 rounded-lg ml-2 font-semibold active:scale-95">
                            <RiSendPlaneFill className="inline h-5 w-5" />
                          </button>
                        </form>
                      )}
                    </div>
                  </footer>
                </div>
              </section>
              {chatInfo && (
                <section className="h-full w-full px-4 pt-2 bg-black">
                  <header className="h-10 w-full font-semibold flex items-center">
                    <IoMdClose
                      onClick={() => setChatInfo(false)}
                      className="h-6 w-6 inline mr-4 cursor-pointer active:scale-95"
                    />
                    Chat Info
                  </header>
                  <main className="h-[94%] w-full overflow-y-auto">
                    <div className="h-fit w-full flex flex-col items-center border-b-2 border-gray-700">
                      <img
                        onClick={() => setViewFullImage(!viewFullImage)}
                        className="h-32 w-32 rounded-full mt-6 cursor-pointer"
                        src={userContact?.profilePic}
                        alt="profile pic"
                      />
                      {viewFullImage && (
                        <div
                          onClick={() => setViewFullImage(!viewFullImage)}
                          className="absolute z-10 top-0 left-0 bg-black bg-opacity-50 h-full w-full flex justify-center items-center"
                        >
                          <img
                            src={userContact?.profilePic}
                            className={`h-96 w-96 cursor-pointer`}
                            alt="profile picture"
                          />
                        </div>
                      )}
                      <p className="h-10 mt-2 font-medium text-xl text-white">
                        {userContact?.username}
                      </p>
                      {userContact?.about && (
                        <div className="h-12 w-full mt-4 px-1 ">
                          <h2 className="text-sm font-medium text-gray-400">
                            About
                          </h2>
                          <p className="py-1 text-white font-light">
                            {userContact?.about}
                          </p>
                        </div>
                      )}
                      <div className="mb-4"></div>
                    </div>
                    <div
                      className={`h-10 w-full flex justify-between items-center px-2 mt-4 border-l-2 transition-all hover:bg-gray-900 ${
                        muteNotifications
                          ? "border-green-500"
                          : "border-red-500"
                      }`}
                    >
                      <p>Mute notifications </p>
                      <button
                        onClick={() => setMuteNotifications(!muteNotifications)}
                        className={`h-6 w-12 px-1 rounded-xl flex items-center transition-transform ${
                          muteNotifications ? "bg-green-600" : "bg-gray-500"
                        }`}
                      >
                        <div
                          className={`h-4 w-4 rounded-full bg-black ${
                            muteNotifications
                              ? "transition-transform translate-x-6"
                              : "transition-transform translate-x-0"
                          }`}
                        ></div>
                      </button>
                    </div>
                    <div
                      className={`h-10 w-full flex justify-between items-center px-2 mt-4 border-l-2 cursor-pointer hover:bg-gray-900 ${
                        disappearingMessagesDuration === "OFF"
                          ? "border-red-500"
                          : "border-green-500"
                      }`}
                    >
                      <p>Disappearing messages </p>
                    </div>
                    <div
                      className={`h-fit w-full flex justify-evenly border-l-2 font-semibold ${
                        disappearingMessagesDuration === "OFF"
                          ? "border-red-500"
                          : "border-green-500"
                      }`}
                    >
                      {["24 hour", "7 days", "1 month", "OFF"].map(
                        (duration) => {
                          return disappearingMessagesDuration === duration ? (
                            disappearingMessagesDuration === "OFF" ? (
                              <button className="h-10 w-full transition-all font-medium text-red-500 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-900">
                                {duration}
                              </button>
                            ) : (
                              <button className="h-10 w-full transition-all font-medium text-green-500 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-900">
                                {duration}
                              </button>
                            )
                          ) : (
                            <button
                              onClick={() =>
                                setDisappearingMessagesDuration(duration)
                              }
                              className="h-10 w-full font-medium text-gray-600 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-900"
                            >
                              {duration}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </main>
                </section>
              )}
            </main>
          )}
          {/* <div className="h-[600px] w-[320px] border-2 border-green-600 flex ">
            <header className="text-xl font-medium mb-2">Star messages</header>
            <main>
              <div className="h-fit w-full bg-black">
                {userInfo?.starMessages &&
                  userInfo.starMessages.map((starMessageId) => (
                    <StarMessageCard
                      starMessageId={starMessageId}
                      key={`${starMessageId}-3232`}
                    />
                  ))}
              </div>
            </main>
          </div> */}
        </div>

        <aside className="py-2">
          <SearchUser />
          <div className="h-60 px-2 mx-2 border-l-2 border-black mb-4">
            <h1 className="font-medium mb-2 border-l-2 border-white px-2">
              Friend requests
            </h1>
            <main className="h-52 w-full overflow-y-auto">
              {userInfo?.friendRequestList.map((friendRequest) => (
                <FriendRequestCard
                  friendRequest={friendRequest}
                  key={friendRequest}
                />
              ))}
            </main>
          </div>
          <div className="h-60 px-2 mx-2 mb-4">
            <h1 className="font-medium mb-2 border-l-2 border-white px-2">
              Friends
            </h1>
            <main className="h-52 w-full overflow-y-auto py-1"></main>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Websocket;
