import React, { useRef, useState } from "react";

import axiosInstance from "@/utils/axiosinstance";
import DialogBox from "./DialogBox";
import Dropdown from "./Dropdown";

import { StoredMessage } from "../Interface/definations";
import { useWebSocketContext } from "@/Context/WebsocketContext";

import { IoBanSharp } from "react-icons/io5";
import { TiStar } from "react-icons/ti";
import { BsPin, BsPinFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import DropdownActionCard from "./DropdownActionCard";
import { MdOutlineModeEditOutline } from "react-icons/md";
import toast from "react-hot-toast";

const SenderMessageCard = ({ message }: { message: StoredMessage }) => {
  const { sendMessage, roomId } = useWebSocketContext();

  const [edit, setEdit] = useState(false);
  const [editedContent, setEditContent] = useState(message.content);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownActions = [
    {
      name: "Pin",
      Icon: BsPin,
      action: () => {
        // console.log(" PIN  ", message.content);
        toast.error("Coming soon");
      },
    },
    {
      name: "Edit",
      Icon: MdOutlineModeEditOutline,
      action: () => {
        // console.log(" EDIT  ", message.content);
        toast.error("Coming soon");
      },
    },
    {
      name: "Delete",
      Icon: RiDeleteBin6Line,
      action: () => {
        // console.log(" DELETE  ", message.content);
        toast.error("Coming soon");
      },
    },
  ];

  const editMessageHandler = (value: string) => {
    setEditContent(value);
  };

  const time = new Date(message.createdAt!);

  // Format time
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  // const seconds = String(time.getSeconds()).padStart(2, "0");

  // Combine them all
  const formattedTime = `${hours}:${minutes}`;

  const saveEditMessageHandler = async () => {
    if (message.content.trim() === editedContent.trim()) return;

    try {
      const { data } = await axiosInstance.patch("/users/chat/messages", {
        mid: message._id,
        newContent: editedContent,
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }

    sendMessage({
      action: "UPDATE",
      room: roomId!,
    });
  };

  return (
    <>
      {edit && (
        <DialogBox
          isOpen={edit}
          setIsOpen={setEdit}
          inputBox={true}
          primaryBtnAction={saveEditMessageHandler}
          primaryBtnText="Save"
          secondaryBtnText="Cancel"
          editContent={editedContent}
          editContentHandler={editMessageHandler}
          title={"Edit Message"}
        />
      )}

      {message.visibleToEveryone ? (
        message.visibleToSender && (
          <div
            className={`relative h-fit w-full px-4 flex justify-end mb-0.5 ${
              edit && "bg-gray-400 dark:bg-gray-600 bg-opacity-40"
            }`}
            key={message._id}
          >
            <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-red-200 dark:border-l-red-800"></p>
            {message.content.length > 50 ? (
              <div
                className={`group relative h-full w-fit font-normal px-2 py-1 rounded-lg bg-red-200 text-black dark:bg-red-800 dark:text-white`}
              >
                <p className="px-1">{message.content}</p>
                <span className="h-fit w-full text-xs px-1 text-gray-700 dark:text-gray-300 flex justify-end items-end gap-[2px] ">
                  {message.isStar && <TiStar className="h-3 w-3" />}
                  {message.isPinned && <BsPinFill className="h-2 w-2" />}
                  {message.isEdited && "Edited"}
                  {formattedTime}
                </span>
                <div className="absolute right-1 top-1 blur-sm bg-red-200 dark:bg-red-800 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="absolute right-2.5 top-2.5 text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all group-hover:animate-leftSlideIn"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  <div ref={dropdownRef} className={`absolute`}></div>
                </button>
                {dropdown && (
                  <Dropdown
                    dropdownRef={dropdownRef}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    style="w-40"
                  >
                    {dropdownActions.map((action) => (
                      <DropdownActionCard
                        name={action.name}
                        action={action.action}
                        Icon={action.Icon}
                        key={action.name}
                      />
                    ))}
                  </Dropdown>
                )}
              </div>
            ) : (
              <div
                className={`group relative h-full w-fit font-normal px-2 py-1 rounded-lg bg-red-200 text-black dark:bg-red-800 dark:text-white flex items-end`}
              >
                <p className="px-1">{message.content}</p>
                <span className="h-full w-fit text-xs px-1 text-gray-700 dark:text-gray-300 flex items-end gap-[2px]">
                  {message.isStar && <TiStar className="h-3 w-3" />}
                  {message.isPinned && <BsPinFill className="h-2 w-2" />}
                  {message.isEdited && "Edited"}
                  {formattedTime}
                </span>
                <div className="absolute right-1 top-1 blur-sm bg-red-200 dark:bg-red-800 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
                <button
                  onClick={() => setDropdown(!dropdown)}
                  className="absolute right-2.5 top-2.5 text-gray-700 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all group-hover:animate-leftSlideIn"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                  <div ref={dropdownRef} className={`absolute`}></div>
                </button>
                {dropdown && (
                  <Dropdown
                    dropdownRef={dropdownRef}
                    dropdown={dropdown}
                    setDropdown={setDropdown}
                    style="w-40"
                  >
                    {dropdownActions.map((action) => (
                      <DropdownActionCard
                        name={action.name}
                        action={action.action}
                        Icon={action.Icon}
                        key={action.name}
                      />
                    ))}
                  </Dropdown>
                )}
              </div>
            )}
          </div>
        )
      ) : (
        <div
          className={`relative h-fit w-full px-4 flex justify-end mb-0.5 ${
            edit && "bg-gray-600 bg-opacity-40"
          }`}
          key={message._id}
        >
          <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-gray-700 dark:border-l-gray-900"></p>
          <div
            className={`h-full w-fit px-2 rounded-lg bg-red-200 text-gray-300 dark:bg-red-700 dark:text-gray-400 flex items-center`}
          >
            <IoBanSharp className="inline" />
            <p className="px-1 italic">You deleted this message</p>
            <span className="h-full text-[8px] px-1 text-gray-300 dark:text-gray-400 flex items-end">
              {formattedTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SenderMessageCard;
