import React, { useRef, useState } from "react";

import { StoredMessage } from "../Interface/definations";

import { IoBanSharp } from "react-icons/io5";
import { BsPin, BsPinFill } from "react-icons/bs";
import Dropdown from "./Dropdown";
import DropdownActionCard from "./DropdownActionCard";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosinstance";
import { useWebSocketContext } from "@/Context/WebsocketContext";

const ReceiverMessageCard = ({ message }: { message: StoredMessage }) => {
  const { roomId, sendMessage } = useWebSocketContext();
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownActions = [
    {
      name: message.isPinned ? "Unpin" : "Pin",
      Icon: BsPin,
      action: () => {
        (async () => {
          try {
            await axiosInstance.patch(`messages/${message._id}/pin`, {
              crid: roomId,
            });
          } catch (error) {
            console.log(error);
          }

          sendMessage({
            action: "UPDATE",
            room: roomId!,
          });
        })();
      },
    },
    {
      name: "Delete",
      Icon: RiDeleteBin6Line,
      action: () => {
        toast.error("Coming soon");
      },
    },
  ];

  const time = new Date(message.createdAt!);

  // Format time parts
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  // const seconds = String(time.getSeconds()).padStart(2, "0");

  // Combine them all
  const formattedTime = `${hours}:${minutes}`;

  return (
    <>
      {message.visibleToEveryone ? (
        <div className={` h-fit w-full px-4 flex mb-0.5`} key={message._id}>
          {/* <p className="absolute left-2 top-[2px] border-l-[14px] border-l-transparent border-t-[10px] border-t-gray-100 dark:border-t-gray-800"></p> */}
          {message.content.length > 50 ? (
            <div
              className={`group relative h-full w-fit px-2 py-1 font-normal rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-950 dark:text-gray-300 mb-0.5`}
            >
              <p className="px-1">{message.content}</p>
              <span className="h-fit text-[10px] px-1 text-gray-800 dark:text-gray-400 flex justify-end items-end gap-0.5">
                {/* {message.isStar && <TiStar className="h-3 w-3" />} */}
                {message.isPinned && <BsPinFill className="h-3 w-3" />}
                {message.isEdited && <span>Edited</span>}
                {formattedTime}
              </span>
              <div className="absolute right-1 top-1 blur-sm bg-gray-100 dark:bg-slate-800 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
              <button
                onClick={() => setDropdown(!dropdown)}
                className={`absolute right-2.5 top-2.5 text-gray-800 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:animate-leftSlideIn`}
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
              className={`group relative h-full w-fit px-2 py-1 font-normal rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-950 dark:text-gray-300 flex items-end mb-0.5`}
            >
              <p className="px-1">{message.content}</p>
              <span className="h-full text-[10px] px-1 text-gray-800 dark:text-gray-400 flex items-end gap-0.5">
                {/* {message.isStar && <TiStar className="h-3 w-3" />} */}
                {message.isPinned && <BsPinFill className="h-3 w-3" />}
                {message.isEdited && <span>Edited</span>}
                {formattedTime}
              </span>
              <div className="absolute right-1 top-1 blur-sm bg-gray-100 dark:bg-slate-800 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="absolute right-2.5 top-2.5 text-gray-800 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-all group-hover:animate-leftSlideIn"
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
      ) : (
        <div className={`relative h-10 w-full px-4 flex`} key={message._id}>
          {/* <p className="absolute left-2 top-[2px] border-l-[14px] border-l-transparent border-t-[10px] border-t-gray-100 dark:border-t-gray-800"></p> */}
          <div
            className={`h-full w-fit px-2 py-1 font-normal rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-950 dark:text-gray-400 flex items-center`}
          >
            <IoBanSharp className="inline" />
            <p className="px-1 italic">This message was deleted</p>
            <span className="h-full text-[10px] px-1 text-gray-800 dark:text-gray-400 flex items-end">
              {formattedTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ReceiverMessageCard;
