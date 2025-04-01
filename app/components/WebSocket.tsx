"use client";

import axiosInstance from "@/utils/axiosinstance";
import React, { FormEvent, useEffect, useState } from "react";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";

import FriendCard from "./FriendCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";

export interface UserProfile {
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
}

const Websocket = () => {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { userContact, contactMessages } = useUserContactContext();

  const [textMessage, setTextMessage] = useState<string | null>(null);
  // const [action, setAction] = useState<"MESSAGE" | "JOIN" | "LEAVE">("MESSAGE");

  const { isConnected, roomId, sendMessage, messages, setMessages } =
    useWebSocketContext();

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (contactMessages) setMessages(contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    console.log("MESSAGES : ", messages);
  }, [messages]);

  // const actionHandler = () => {
  //   if (action === "MESSAGE") setAction("JOIN");
  //   else if (action === "JOIN") setAction("LEAVE");
  //   else setAction("MESSAGE");
  // };

  const getProfile = async () => {
    const {
      data,
    }: {
      data: {
        data: UserProfile;
      };
    } = await axiosInstance.get(`/users/profile`);
    console.log(data.data);

    setUserInfo(data.data);
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
      await axiosInstance.patch("/users/chat/messages/deleteforme", {
        mid: mid,
      });
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
      await axiosInstance.patch("/users/chat/messages/deleteforeveryone", {
        mid: mid,
      });
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
      await axiosInstance.delete("/users/chat/messages", {
        params: {
          crid: roomId,
        },
      });
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
      const { data } = await axiosInstance.patch("/users/chat/messages", {
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

    const updatedMessages = messages?.map((message) => {
      if (message._id === mid) {
        message.isPinned = !message.isPinned;
      }

      return message;
    });

    console.log(updatedMessages);

    setMessages(updatedMessages!);
  };

  // Actions Btns
  const btnActionName = ["DFE", "DFM", "DCM", "PIN", "STAR"];

  const btnActions = [
    deleteMessageForEveryoneHandler,
    deleteMessageForMeHandler,
    deleteChatMessagesHandler,
    pinMessageHandler,
  ];

  const [currentActionIndex, setCurrentActionIndex] = useState(0);

  const changeBtnActionHandler = (actionName: string, index: number) => {
    console.log(actionName);
    setCurrentActionIndex(index);
  };

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

      <div className="font-medium text-xl">Contacts</div>
      <main className="flex gap-2">
        <div>
          {userInfo &&
            userInfo.friendList.map((friend) => (
              <FriendCard
                key={friend.contactId}
                contactId={friend.contactId}
                roomId={friend.roomId}
                // setMessages={setMessages}
                sendMessage={sendMessage}
              />
            ))}
        </div>
        {roomId && (
          <section className="h-[600px] w-[500px] rounded-lg flex flex-col gap-1">
            <div className="h-10 w-full">
              {btnActionName.map((actionName, index) => (
                <button
                  key={actionName}
                  onClick={() => changeBtnActionHandler(actionName, index)}
                  className="px-3 py-1 border-2 border-gray-700 active:scale-90 active:border-blue-500 transition-all"
                >
                  {actionName}
                </button>
              ))}
            </div>
            <div className="h-[600px] w-[500px] bg-black rounded-lg flex flex-col mt-2">
              <header className="h-10 w-full font-semibold px-2 flex items-center border-b-2 border-gray-700">
                {userContact?.username}
              </header>

              <main className="h-full w-full flex flex-col gap-1 py-1 font-normal overflow-y-auto">
                {messages?.map((message) =>
                  message.senderId === userInfo?._id ? (
                    <SenderMessageCard
                      message={message}
                      key={message._id}
                      deleteMessageHandler={btnActions[currentActionIndex]}
                    />
                  ) : (
                    <ReceiverMessageCard message={message} key={message._id} />
                  )
                )}
              </main>
              <footer className="h-fit w-full border-t-2 border-gray-700 bg-gray-950 flex items-center px-2 py-2">
                <div className="h-fit w-full">
                  {/* <div className="px-2 py-1">Hare Krishna</div> */}
                  <form onSubmit={sendMessageHandler}>
                    <input
                      type="text"
                      placeholder="Type a message"
                      value={textMessage || ""}
                      onChange={(e) => setTextMessage(e.target.value)}
                      className="h-8 w-[400px] px-2 outline-none rounded-lg focus:border-2 focus:border-blue-500"
                    />
                    <button className="px-4 py-1 bg-blue-600 rounded-lg ml-2 font-semibold active:scale-95">
                      Send
                    </button>
                  </form>
                </div>
              </footer>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Websocket;
