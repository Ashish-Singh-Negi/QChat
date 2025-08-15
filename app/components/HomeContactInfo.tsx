"use client";

import React, { useEffect, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";

import { useUserContactContext } from "@/Context/UserContactContext";

import ProfilePic from "./ProfilePic";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useChatsContext } from "@/Context/ChatsContext";

const HomeContactInfo = ({
  setOpenContactInfo,
}: {
  setOpenContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { selectedContact } = useUserContactContext();
  const { selectedChat } = useChatsContext();

  const [showFullImage, setShowFullImage] = useState(false);
  const [muteNotifications, setMuteNotifications] = useState(false);

  const [disappearingMessagesDuration, setDisappearingMessagesDuration] =
    useState("");

  const updateDisappearingMessageSettings = async (duration: string) => {
    const prevDisapperingMessagesDuration = disappearingMessagesDuration;
    try {
      const { data } = await axiosInstance.patch(
        `/chats/${selectedChat?._id}/disappearduration`,
        {
          disappearingMessagesDuration: duration,
        }
      );
      console.log(data);
    } catch (error) {
      setDisappearingMessagesDuration(prevDisapperingMessagesDuration);
      toast.error("Failed to Change Disappearing Messages Duration");
      console.error(error);
    }

    // TODO fetch updated Chat DisappearingMessages duration
    // getDisappearingMessagesStatus();
  };

  useEffect(() => {
    if (!selectedChat) return;

    switch (selectedChat.disappearingMessages) {
      case "24h":
        setDisappearingMessagesDuration("24 hours");
        break;
      case "7d":
        setDisappearingMessagesDuration("7 days");
        break;
      case "1m":
        setDisappearingMessagesDuration("1 month");
        break;

      default:
        setDisappearingMessagesDuration("OFF");
        break;
    }
  }, [selectedChat]);

  // const getDisappearingMessagesStatus = async () => {
  //   try {
  //     const {
  //       data,
  //     }: {
  //       data: {
  //         data: {
  //           disappearingMessages: string;
  //         };
  //       };
  //     } = await axiosInstance.get(`/chats/${roomId}`, {
  //       params: {
  //         filter: "disappearingMessages",
  //       },
  //     });

  //     console.log(data.data);
  //   } catch (error: any) {
  //     toast.error(error?.response.data.error);
  //     console.error(error);
  //   }
  // };

  if (!selectedContact) return;

  return (
    <section className="h-full w-2/3 px-4 pt-2 bg-white dark:bg-black animate-slideIn">
      <header className="h-10 w-full font-semibold flex items-center mb-6">
        <button className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full mr-2 grid place-items-center">
          <X
            onClick={() => setOpenContactInfo(false)}
            className="h-6 w-6 inline cursor-pointer active:scale-95"
          />
        </button>
        Contact Info
      </header>
      <main className="h-[92%] w-full overflow-y-auto overflow-x-hidden">
        <div className="h-fit w-full flex flex-col items-center border-b-2 dark:border-gray-800">
          <div className="h-32 w-32 cursor-pointer text-5xl">
            <ProfilePic
              profilePic={selectedContact.profilePic}
              username={selectedContact.username}
              setShowFullImage={setShowFullImage}
            />
          </div>
          {showFullImage && (
            <div
              onClick={() => setShowFullImage(!showFullImage)}
              className="absolute z-10 top-0 left-0 bg-black bg-opacity-50 h-full w-full flex justify-center items-center"
            >
              <img
                src={selectedContact?.profilePic}
                className={`h-96 w-96 cursor-pointer`}
                alt="profile picture"
              />
            </div>
          )}
          <p className="h-10 mt-2 font-medium text-xl text-black dark:text-white">
            {selectedContact?.username}
          </p>
          {selectedContact.about && (
            <div className="h-12 w-full mt-4 px-1 ">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                About
              </h2>
              <p className="py-1 text-gray-950 dark:text-gray-400 font-normal">
                {" "}
                {selectedContact.about}
              </p>
            </div>
          )}
          <div className="mb-4"></div>
        </div>
        <div
          className={`h-10 w-full flex justify-between items-center px-2 mt-4 border-l-2 transition-all hover:bg-gray-200 dark:hover:bg-gray-900 ${
            muteNotifications ? "border-green-500" : "border-red-500"
          }`}
        >
          <p>Mute notifications </p>
          <button
            onClick={() => setMuteNotifications(!muteNotifications)}
            className={`h-6 w-12 px-1 rounded-xl flex items-center transition-transform ${
              muteNotifications
                ? "bg-green-500"
                : "bg-gray-400 dark:bg-gray-700"
            }`}
          >
            <div
              className={`h-4 w-4 rounded-full bg-white dark:bg-black ${
                muteNotifications
                  ? "transition-transform translate-x-6"
                  : "transition-transform translate-x-0"
              }`}
            ></div>
          </button>
        </div>
        <div
          className={`h-10 w-full flex justify-between items-center px-2 mt-4 border-l-2 ${
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
          {["24 hours", "7 days", "1 month", "OFF"].map((duration) => {
            return disappearingMessagesDuration === duration ? (
              disappearingMessagesDuration === "OFF" ? (
                <button
                  key={duration}
                  className="h-10 w-full transition-all font-medium text-red-500 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
                >
                  {duration}
                </button>
              ) : (
                <button
                  key={duration}
                  className="h-10 w-full transition-all font-medium text-green-500 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
                >
                  {duration}
                </button>
              )
            ) : (
              <button
                key={duration}
                onClick={() => {
                  setDisappearingMessagesDuration(duration);
                  updateDisappearingMessageSettings(duration);
                }}
                className="h-10 w-full font-medium text-gray-600 px-4 flex justify-center items-center text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-900"
              >
                {duration}
              </button>
            );
          })}
        </div>
      </main>
    </section>
  );
};

export default HomeContactInfo;
