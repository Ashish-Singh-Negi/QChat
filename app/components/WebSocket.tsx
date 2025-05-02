"use client";

import axiosInstance from "@/utils/axiosinstance";
import React, { FormEvent, useEffect, useState } from "react";

import { useWebSocketContext } from "@/Context/WebsocketContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useUserInfoContext } from "@/Context/UserInfoContext";

import FriendCard from "./FriendCard";
import SenderMessageCard from "./SenderMessageCard";
import ReceiverMessageCard from "./ReceiverMessageCard";

import { UserInfo } from "../Inteface/definations";
import StarMessage from "./StarMessage";
import FriendRequestCard from "./FriendRequestCard";
import { RiSendPlaneFill } from "react-icons/ri";
import Profile from "./Profile";
import SearchUser from "./SearchUser";
import { Toaster } from "react-hot-toast";

const Websocket = () => {
  const { userInfo, setUserInfo } = useUserInfoContext();
  const { userContact, contactMessages } = useUserContactContext();

  const [textMessage, setTextMessage] = useState<string | null>(null);
  // const [action, setAction] = useState<"MESSAGE" | "JOIN" | "LEAVE">("MESSAGE");

  const { isConnected, roomId, sendMessage, messages, setMessages } =
    useWebSocketContext();

  const [viewFullImage, setViewFullImage] = useState(false);

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

  // return (
  //   <div>
  //     <h1>WebSocket Demo</h1>
  //     <p>Status: {isConnected ? "Connected" : "Disconnected"}</p>

  //     <div className="font-medium text-xl">Contacts</div>
  //     <main className="flex gap-2">
  //       <div>
  //         {userInfo &&
  //           userInfo.friendList.map((friend) => (
  //             <FriendCard
  //               key={friend.contactId}
  //               contactId={friend.contactId}
  //               roomId={friend.roomId}
  //               // setMessages={setMessages}
  //               sendMessage={sendMessage}
  //             />
  //           ))}
  //       </div>
  //       {roomId && (
  //         <section className="h-[600px] w-[500px] rounded-lg flex flex-col gap-1">
  //           <div className="h-10 w-full">
  //             {btnActionName.map((actionName, index) => (
  //               <button
  //                 key={actionName}
  //                 onClick={() => changeBtnActionHandler(actionName, index)}
  //                 className="px-3 py-1 border-2 border-gray-700 active:scale-90 active:border-blue-500 transition-all"
  //               >
  //                 {actionName}
  //               </button>
  //             ))}
  //           </div>
  //           <div className="h-[600px] w-[500px] bg-black rounded-lg flex flex-col mt-2">
  //             <header className="h-10 w-full font-semibold px-2 flex items-center border-b-2 border-gray-700">
  //               {userContact?.username}
  //             </header>

  //             <main className="h-full w-full flex flex-col gap-1 py-1 font-normal overflow-y-auto">
  //               {messages?.map((message) =>
  //                 message.senderId === userInfo?._id ? (
  //                   <SenderMessageCard
  //                     message={message}
  //                     key={message._id}
  //                     deleteMessageHandler={btnActions[currentActionIndex]}
  //                   />
  //                 ) : (
  //                   <ReceiverMessageCard message={message} key={message._id} />
  //                 )
  //               )}
  //             </main>
  //             <footer className="h-fit w-full border-t-2 border-gray-700 bg-gray-950 flex items-center px-2 py-2">
  //               <div className="h-fit w-full">
  //                 {/* <div className="px-2 py-1">Hare Krishna</div> */}
  //                 <form onSubmit={sendMessageHandler}>
  //                   <input
  //                     type="text"
  //                     placeholder="Type a message"
  //                     value={textMessage || ""}
  //                     onChange={(e) => setTextMessage(e.target.value)}
  //                     className="h-8 w-[400px] px-2 outline-none rounded-lg focus:border-2 focus:border-blue-500"
  //                   />
  //                   <button className="px-4 py-1 bg-blue-600 rounded-lg ml-2 font-semibold active:scale-95">
  //                     Send
  //                   </button>
  //                 </form>
  //               </div>
  //             </footer>
  //           </div>
  //         </section>
  //       )}
  //     </main>
  //   </div>
  // );

  return (
    <div>
      <Toaster position="bottom-left" />
      <header className=" h-fit w-full flex justify-between px-2 py-1 pt-2">
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
      <main className="flex justify-between gap-2 border-y-2 border-black py-1 my-2">
        <div className="flex gap-2">
          <div className="px-2">
            <p className="font-medium text-xl mb-1">Contacts</p>
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
            <section className="h-[660px] w-[460px] flex flex-col gap-1 border-x-2 border-black px-2">
              <div className="h-10 w-full">
                {btnActionName.map((actionName, index) => (
                  <button
                    key={actionName}
                    onClick={() => changeBtnActionHandler(actionName, index)}
                    className={`px-3 py-1 border-2 border-gray-700 ${
                      currentActionIndex === index &&
                      "border-blue-500 text-blue-300"
                    } active:scale-90 active:border-blue-500 transition-all`}
                  >
                    {actionName}
                  </button>
                ))}
              </div>
              <div className="h-[600px] w-full bg-black rounded-lg flex flex-col mt-2">
                <header className="h-14 w-full font-semibold px-2 flex items-center gap-2  border-b-2 border-gray-700">
                  <img
                    onClick={() => setViewFullImage(!viewFullImage)}
                    src={userContact?.profilePic ? userContact.profilePic : ""}
                    className="h-8 w-8 rounded-full cursor-pointer"
                    alt=""
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
                  {userContact?.username}
                </header>

                <main className="h-full w-full flex flex-col gap-1 py-1 font-normal overflow-y-auto">
                  {messages?.map((message) =>
                    message.senderId === userInfo?._id ? (
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
                    )
                  )}
                </main>
                <footer className="h-fit w-full border-t-2 border-gray-700 bg-gray-950 flex items-center px-2 py-2">
                  <div className="h-fit w-full">
                    {/* <div className="px-2 py-1">Hare Krishna</div> */}
                    <form className="flex" onSubmit={sendMessageHandler}>
                      <input
                        type="text"
                        placeholder="Type a message"
                        value={textMessage || ""}
                        onChange={(e) => setTextMessage(e.target.value)}
                        className="h-8 w-full px-2 outline-none rounded-lg focus:border-2 focus:border-blue-500"
                      />
                      <button className="flex items-center px-4 py-1 bg-blue-600 rounded-lg ml-2 font-semibold active:scale-95">
                        <RiSendPlaneFill className="inline h-5 w-5" />
                      </button>
                    </form>
                  </div>
                </footer>
              </div>
            </section>
          )}
          <div className="h-[600px] w-[400px]">
            <header className="text-xl font-medium mb-2">Star Messages</header>
            <main>
              <div className="h-fit w-full bg-black">
                {userInfo?.starMessages &&
                  userInfo.starMessages.map((starMessageId) => (
                    <StarMessage
                      starMessageId={starMessageId}
                      key={`${starMessageId}-3232`}
                    />
                  ))}
              </div>
            </main>
          </div>
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
        </aside>
      </main>
    </div>
  );
};

export default Websocket;
