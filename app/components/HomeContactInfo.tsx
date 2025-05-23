"use client";

import { useRoomContext } from "@/Context/RoomContext";
import { useUserContactContext } from "@/Context/UserContactContext";
import { useWebSocketContext } from "@/Context/WebsocketContext";
import axiosInstance from "@/utils/axiosinstance";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";

const HomeContactInfo = ({
  setOpenContactInfo,
}: {
  setOpenContactInfo: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userContact } = useUserContactContext();
  const { roomInfo, setRoomInfo } = useRoomContext();
  const { roomId } = useWebSocketContext();

  const [viewFullImage, setViewFullImage] = useState(false);
  const [muteNotifications, setMuteNotifications] = useState(false);

  const [disappearingMessagesDuration, setDisappearingMessagesDuration] =
    useState("");

  const updateDisappearingMessageSettings = async (duration: string) => {
    try {
      const { data } = await axiosInstance.patch(`/users/chats/${roomId}`, {
        disappearingMessagesDuration: duration,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    // to update room DisappearingMessages duration
    getDisappearingMessagesStatus();
  };

  useEffect(() => {
    if (!roomInfo) return;

    switch (roomInfo.disappearingMessages) {
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
  }, [roomInfo]);

  const getDisappearingMessagesStatus = async () => {
    try {
      const {
        data,
      }: {
        data: {
          data: {
            disappearingMessages: string;
          };
        };
      } = await axiosInstance.get(`/users/chats/${roomId}`, {
        params: {
          filter: "disappearingMessages",
        },
      });

      console.log(data.data);

      setRoomInfo({
        ...roomInfo!,
        disappearingMessages: data.data.disappearingMessages,
      });
    } catch (error: any) {
      toast.error(error?.response.data.error);
      console.error(error);
    }
  };

  return (
    <section className="h-full w-[740px] px-4 pt-2 dark:bg-black">
      <header className="h-10 w-full font-semibold flex items-center mb-6">
        <button className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full mr-2 grid place-items-center">
          <IoMdClose
            onClick={() => setOpenContactInfo(false)}
            className="h-6 w-6 inline cursor-pointer active:scale-95"
          />
        </button>
        Contact Info
      </header>
      <main className="h-[94%] w-full overflow-y-auto">
        <div className="h-fit w-full flex flex-col items-center border-b-2 dark:border-gray-800">
          <img
            onClick={() => setViewFullImage(!viewFullImage)}
            className="h-32 w-32 rounded-full cursor-pointer"
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
          <p className="h-10 mt-2 font-medium text-xl text-black dark:text-white">
            {userContact?.username}
          </p>
          {userContact?.about && (
            <div className="h-12 w-full mt-4 px-1 ">
              <h2 className="text-sm font-medium text-gray-700 dark:text-gray-400">
                About
              </h2>
              <p className="py-1 text-gray-950 dark:text-white font-normal">
                {" "}
                {userContact?.about}
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
