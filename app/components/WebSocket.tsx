// "use client";

// import axiosInstance from "@/utils/axiosinstance";
// import React, { FormEvent, useEffect, useRef, useState } from "react";

// import { useWebSocketContext } from "@/Context/WebsocketContext";
// import { useUserContactContext } from "@/Context/UserContactContext";
// import { useUserInfoContext } from "@/Context/UserInfoContext";
// import { useRoomContext } from "@/Context/RoomContext";

// import SenderMessageCard from "./SenderMessageCard";
// import ReceiverMessageCard from "./ReceiverMessageCard";
// import FriendRequestCard from "./FriendRequestCard";
// import Profile from "./Profile";
// import SearchUser from "./SearchUser";
// import RoomMessageCard from "./RoomMessageCard";
// import ContactCard from "./ContactCard";
// import HomeContactInfo from "./HomeContactInfo";
// import Dropdown from "./Accordion";
// import FriendCard from "./FriendCard";

// import { RiSendPlaneFill } from "react-icons/ri";

// import toast, { Toaster } from "react-hot-toast";

// import { UserInfo } from "../Interface/definations";
// import ProfilePic from "./ProfilePic";

// const Websocket = () => {
//   const { userInfo, getUserProfile } = useUserInfoContext();
//   const { userContact, contactMessages } = useUserContactContext();
//   const { isConnected, roomId, sendMessage, messages, setMessages } =
//     useWebSocketContext();
//   const { roomInfo } = useRoomContext();

//   const [textMessage, setTextMessage] = useState<string | null>(null);

//   const [openContactInfo, setOpenContactInfo] = useState(false);

//   const chatRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     console.log("Scroll Height : ", chatRef.current?.scrollHeight);

//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }

//     console.log("Scroll Top : ", chatRef.current?.scrollTop);

//     console.log("messages : ", messages);
//   }, [messages]);

//   const sendFriendRequestHandler = async () => {
//     try {
//       const response = await axiosInstance.post<{
//         data: UserInfo;
//         message: string;
//       }>(`/friends/requests`, {
//         friendUsername: userContact?.username,
//       });

//       console.log(response.data.data);
//       toast.success(response.data.message);
//     } catch (error: any) {
//       toast.error(error?.response?.data?.error);
//       console.error(error);
//     }
//   };

//   const sendMessageHandler = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!textMessage?.trim()) return;

//     sendMessage({
//       action: "MESSAGE",
//       content: textMessage.trim(),
//       room: roomId!,
//       sender: userInfo!._id,
//       receiver: userContact?._id,
//     });

//     setTextMessage(null);
//   };

//   // const deleteMessageForMeHandler = async (mid: string) => {
//   //   try {
//   //     await axiosInstance.patch(`/users/chats/messages/${mid}/deleteforme`);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }

//   //   sendMessage({
//   //     action: "UPDATE",
//   //     room: roomId!,
//   //   });

//   //   // const updatedMessages = messages?.map((mess) => {
//   //   //   if (mess._id === mid) {
//   //   //     mess.content = "You deleted this message";
//   //   //   } else mess;

//   //   //   return mess;
//   //   // });
//   //   // setMessages(updatedMessages!);
//   // };

//   // const deleteMessageForEveryoneHandler = async (mid: string) => {
//   //   try {
//   //     console.log("MID : ", mid);
//   //     await axiosInstance.patch(
//   //       `/users/chats/messages/${mid}/deleteforeveryone`
//   //     );
//   //   } catch (error) {
//   //     console.error(error);
//   //   }

//   //   sendMessage({
//   //     action: "UPDATE",
//   //     room: roomId!,
//   //   });

//   // const updatedMessages = messages?.map((mess) => {
//   //   if (mess._id === mid) {
//   //     mess.content = "You deleted this message";
//   //   } else mess;

//   //   return mess;
//   // });
//   // setMessages(updatedMessages!);
//   // };

//   // const deleteChatMessagesHandler = async () => {
//   //   try {
//   //     await axiosInstance.delete(`/users/chats/${roomId}/messages`);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }

//   //   sendMessage({
//   //     action: "UPDATE",
//   //     room: roomId!,
//   //   });

//   //   // const updatedMessages = messages?.map((mess) => {
//   //   //   if (mess._id === mid) {
//   //   //     mess.content = "You deleted this message";
//   //   //   } else mess;

//   //   //   return mess;
//   //   // });
//   //   // setMessages(updatedMessages!);
//   // };

//   // const pinMessageHandler = async (mid: string) => {
//   //   if (!messages || !roomId) return;

//   //   console.log("PIN mid : ", mid);

//   //   // Find message and determine new pin status
//   //   const targetMessage = messages.find((msg) => msg._id === mid);
//   //   if (!targetMessage) return;

//   //   const newPinnedState = !targetMessage.isPinned;

//   //   // Update UI optimistically
//   //   const updatedMessages = messages.map((message) =>
//   //     message._id === mid ? { ...message, isPinned: newPinnedState } : message
//   //   );
//   //   setMessages(updatedMessages);

//   //   try {
//   //     const { data } = await axiosInstance.patch(
//   //       `/users/chats/${roomId}/messages/${mid}/pin`
//   //     );

//   //     console.log("PIN update response:", data);
//   //   } catch (error) {
//   //     console.error(error);

//   //     // Rollback UI if error
//   //     const rolledBackMessages = messages.map((message) =>
//   //       message._id === mid
//   //         ? { ...message, isPinned: targetMessage.isPinned } // original value
//   //         : message
//   //     );
//   //     setMessages(rolledBackMessages);
//   //   }

//   //   // Notify others in the room
//   //   sendMessage({
//   //     action: "UPDATE",
//   //     room: roomId,
//   //   });
//   // };

//   // const starMessageHandler = async (mid: string) => {
//   //   try {
//   //     const { data } = await axiosInstance.patch(
//   //       `/users/chats/messages/${mid}/star`,
//   //       {
//   //         uid: userInfo?._id,
//   //       }
//   //     );

//   //     console.log(data);
//   //   } catch (error) {
//   //     console.error(error);
//   //   }

//   //   sendMessage({
//   //     action: "UPDATE",
//   //     room: roomId!,
//   //   });

//   //   setUserInfo((prev) => {
//   //     if (!prev) return prev;

//   //     const isStarred = prev.starMessages.includes(mid);
//   //     const updatedStarMessages = isStarred
//   //       ? prev.starMessages.filter((id) => id !== mid)
//   //       : [...prev.starMessages];

//   //     return {
//   //       ...prev,
//   //       starMessages: updatedStarMessages,
//   //     };
//   //   });
//   // };

//   // Actions Btns
//   // const btnActionName = ["DFE", "DFM", "DCM", "PIN"];

//   // const btnActions = [
//   //   deleteMessageForEveryoneHandler,
//   //   deleteMessageForMeHandler,
//   //   deleteChatMessagesHandler,
//   //   pinMessageHandler,
//   //   // starMessageHandler,
//   // ];

//   const [currentActionIndex, setCurrentActionIndex] = useState(0);

//   const changeBtnActionHandler = (actionName: string, index: number) => {
//     console.log(actionName);
//     setCurrentActionIndex(index);
//   };

//   const disappearMessagesAboveDurationHandler = async () => {
//     try {
//       const { data } = await axiosInstance.delete(
//         `/users/chats/${roomId}/messages`,
//         {
//           params: {
//             action: "DISAPPEAR_MESSAGES",
//             duration: roomInfo?.disappearingMessages,
//           },
//         }
//       );

//       console.log("Disappear Message Handler : ", data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getUserProfile();
//   }, []);

//   useEffect(() => {
//     if (contactMessages) setMessages(contactMessages);
//   }, [contactMessages]);

//   useEffect(() => {
//     if (!roomInfo || !roomId) return;

//     if (roomInfo.disappearingMessages !== "OFF") {
//       disappearMessagesAboveDurationHandler();
//     }
//   }, [roomInfo]);

//   useEffect(() => {
//     console.log(userContact);
//   }, [userContact]);

//   useEffect(() => {
//     console.log("MESSAGES : ", messages);
//   }, [messages]);

//   return (
//     <div className="h-full w-full">
//       <Toaster position="bottom-right" />
//       <header className="h-fit w-full flex justify-between px-2 py-1 pt-2">
//         <div>
//           {" "}
//           <h1 className="font-semibold">WebSocket Demo</h1>
//           <p>
//             Status :{" "}
//             <span
//               className={`font-medium ${
//                 isConnected
//                   ? "text-green-600 dark:text-green-400"
//                   : "text-red-400 dark:text-red-600"
//               }`}
//             >
//               {isConnected ? "Connected" : "Disconnected"}
//             </span>
//           </p>
//         </div>
//         <Profile />
//       </header>
//       <main className="h-full w-full flex justify-between gap-2 border-t-2 border-gray-400 dark:border-black my-2 py-2 overflow-x-auto">
//         <div className="flex gap-2">
//           <div className="px-2">
//             <p className="font-medium text-xl mb-1">Contacts</p>
//             {userInfo &&
//               userInfo.chats.map((roomId) => (
//                 <ContactCard
//                   // contactId={friend.contactId}
//                   // setMessages={setMessages}
//                   key={roomId}
//                   roomId={roomId}
//                   sendMessage={sendMessage}
//                 />
//               ))}
//           </div>
//           {roomId && (
//             <main className="h-[800px] w-[1220px] flex">
//               {" "}
//               <section className="h-full w-full flex flex-col gap-1 px-2 transition-transform ">
//                 <div className="h-10 w-full dark:bg-black">
//                   {/* {btnActionName.map((actionName, index) => (
//                     <button
//                       key={actionName}
//                       onClick={() => changeBtnActionHandler(actionName, index)}
//                       className={`px-3 py-1 border-b-2 ${
//                         currentActionIndex === index &&
//                         "font-medium text-blue-600 border-blue-600 dark:text-blue-300 dark:border-blue-300"
//                       } active:scale-90 active:border-blue-500 transition-all`}
//                     >
//                       {actionName}
//                     </button>
//                   ))} */}
//                 </div>
//                 <div className="h-full w-full border-2 border-gray-400 dark:border-black dark:bg-black rounded-lg flex flex-col mt-2">
//                   {userContact && (
//                     <header
//                       onClick={() => setOpenContactInfo(true)}
//                       className="h-14 w-full font-semibold px-2 flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-950 transition-all text-black dark:text-white border-b-2 border-gray-400 dark:border-gray-700 cursor-pointer"
//                     >
//                       <div className="h-10 w-10 text-xl">
//                         <ProfilePic
//                           profilePic={userContact.profilePic!}
//                           username={userContact.username!}
//                         />
//                       </div>
//                       {userContact.username}
//                     </header>
//                   )}
//                   <main
//                     ref={chatRef}
//                     className="h-[640px] w-full flex flex-col gap-1 py-1 font-normal overflow-y-auto"
//                   >
//                     {messages?.map((message) => {
//                       if (!message.senderId)
//                         return (
//                           <RoomMessageCard
//                             message={message.content}
//                             key={message._id}
//                           />
//                         );
//                       else
//                         return message.senderId === userInfo?._id ? (
//                           <SenderMessageCard
//                             key={message._id}
//                             message={message}
//                             // actionsHandler={btnActions[currentActionIndex]}
//                           />
//                         ) : (
//                           <ReceiverMessageCard
//                             message={message}
//                             key={message._id}
//                           />
//                         );
//                     })}
//                     {roomInfo?.isDisabled && (
//                       <div className="h-14 w-full flex flex-col gap-2 items-center">
//                         <p className="w-full text-center px-4 py-1 bg-gray-800 text-white">
//                           you and {userContact?.username} are no longer friends.
//                           To start conversation again send friend request or
//                           <br />
//                           Delete the conversation
//                         </p>
//                         <div className="w-full flex gap-2">
//                           <button className="h-10 w-full px-4 py-1 flex justify-center items-center gap-1 bg-red-600 text-white font-medium active:scale-x-95 transition-all">
//                             Delete{" "}
//                           </button>{" "}
//                           <button
//                             onClick={sendFriendRequestHandler}
//                             className="h-10 w-full px-4 py-1 flex justify-center items-center gap-1 bg-blue-600 text-white font-medium active:scale-x-95 transition-all"
//                           >
//                             send{" "}
//                             <RiSendPlaneFill className="inline mt-1 h-3 w-3" />
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </main>
//                   <footer className="h-14 w-full border-t-2 border-gray-400 dark:border-gray-700 dark:bg-gray-950 flex items-center px-2 py-2">
//                     <div className="h-fit w-full">
//                       {roomInfo?.isDisabled ? (
//                         <div className="flex">
//                           <input
//                             type="text"
//                             placeholder="Message"
//                             disabled
//                             className="h-10 w-full px-2 outline-none rounded-lg border-2 dark:border-gray-800 hover:cursor-not-allowed"
//                           />
//                           <button className="flex items-center px-4 py-1 bg-gray-600 text-white rounded-lg ml-2 font-semibold active:scale-95 hover:cursor-not-allowed">
//                             <RiSendPlaneFill className="inline h-5 w-5" />
//                           </button>
//                         </div>
//                       ) : (
//                         <form className="flex" onSubmit={sendMessageHandler}>
//                           <input
//                             type="text"
//                             placeholder="Message"
//                             value={textMessage || ""}
//                             onChange={(e) => setTextMessage(e.target.value)}
//                             className="h-10 w-full px-2 outline-none rounded-lg border-2 border-gray-400 bg-gray-100 text-black dark:bg-black dark:border-gray-800 dark:text-white focus:border-blue-600 transition-all"
//                           />
//                           <button className="flex items-center px-4 py-1 bg-blue-600 text-white rounded-lg ml-2 font-semibold active:scale-95">
//                             <RiSendPlaneFill className="inline h-5 w-5" />
//                           </button>
//                         </form>
//                       )}
//                     </div>
//                   </footer>
//                 </div>
//               </section>
//               {openContactInfo && (
//                 <HomeContactInfo setOpenContactInfo={setOpenContactInfo} />
//               )}
//             </main>
//           )}
//           {/* <div className="h-[600px] w-[320px] border-2 border-green-600 flex ">
//             <header className="text-xl font-medium mb-2">Star messages</header>
//             <main>
//               <div className="h-fit w-full bg-black">
//                 {userInfo?.starMessages &&
//                   userInfo.starMessages.map((starMessageId) => (
//                     <StarMessageCard
//                       starMessageId={starMessageId}
//                       key={`${starMessageId}-3232`}
//                     />
//                   ))}
//               </div>
//             </main>
//           </div> */}
//         </div>

//         <aside className="py-2">
//           <Dropdown title="Friends">
//             {userInfo?.friends &&
//               userInfo?.friends.map((friendId) => (
//                 <FriendCard key={friendId} friendId={friendId} />
//               ))}
//           </Dropdown>
//           <SearchUser />
//           <div className="h-60 px-2 mx-2 mb-4">
//             <h1 className="h-8 flex items-center text-lg font-medium mb-2 border-l-2 dark:text-white border-gray-400 dark:border-white px-2">
//               Requests
//             </h1>
//             <main className="h-52 w-full overflow-y-auto">
//               {userInfo?.friendRequests &&
//                 userInfo?.friendRequests.map((friendRequest) => (
//                   <FriendRequestCard
//                     requestId={friendRequest}
//                     key={friendRequest}
//                   />
//                 ))}
//             </main>
//           </div>
//         </aside>
//       </main>
//     </div>
//   );
// };

// export default Websocket;
