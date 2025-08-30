import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "@/utils/axiosinstance";

import {
  Ban,
  Check,
  CheckCheck,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";

import { StoredMessage } from "../../Interface/definations";

import Dropdown from "./Dropdown";
import DropdownActionCard from "./DropdownActionCard";
import EditDialogBox from "./EditDialogBox";
import { useChatsContext } from "@/Context/ChatsContext";

const SenderMessageCard = ({ message }: { message: StoredMessage }) => {
  const { selectedChat } = useChatsContext();

  const [edit, setEdit] = useState(false);

  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownActions = [
    {
      name: message.isPinned ? "Unpin" : "Pin",
      Icon: message.isPinned ? PinOff : Pin,
      action: () => {
        (async () => {
          try {
            await axiosInstance.patch(`messages/${message._id}/pin`, {
              crid: selectedChat?._id,
            });
          } catch (error) {
            console.log(error);
          }

          // sendMessage({
          //   action: "UPDATE",
          //   room: roomId!,
          // });
        })();
      },
    },
    {
      name: "Edit",
      Icon: Pencil,
      action: () => {
        setEdit(!edit);
      },
    },
    {
      name: "Delete",
      Icon: Trash2,
      action: () => {
        // console.log(" DELETE  ", message.content);
        toast.error("Coming soon");
      },
    },
  ];

  const time = new Date(message.createdAt!);

  // Format time
  const hours = String(time.getHours()).padStart(2, "0");
  const minutes = String(time.getMinutes()).padStart(2, "0");
  // const seconds = String(time.getSeconds()).padStart(2, "0");

  // Combine them all
  const formattedTime = `${hours}:${minutes}`;

  const saveEditedMessageHandler = async (editedContent: string) => {
    if (!editedContent) return;
    if (message.content.trim() === editedContent.trim()) return;

    try {
      await axiosInstance.patch(`/messages/${message._id}/edit`, {
        content: editedContent,
      });
    } catch (error) {
      console.error(error);
    }

    // sendMessage({
    //   action: "UPDATE",
    //   room: roomId!,
    // });
  };

  return (
    <>
      {edit && (
        <EditDialogBox
          isOpen={edit}
          setIsOpen={setEdit}
          title={"Edit Message"}
          messageContent={message.content}
          saveEditedMessageHandler={saveEditedMessageHandler}
        />
      )}

      {message.visibleToEveryone ? (
        message.visibleToSender && (
          <div
            className={` h-fit w-full px-4 flex justify-end mb-0.5 ${
              edit && "bg-gray-400 dark:bg-gray-600 bg-opacity-40"
            }`}
            key={message._id}
          >
            {/* <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-red-200 dark:border-l-slate-950"></p> */}
            {message.content.length > 50 ? (
              <div
                className={`group relative h-full w-fit font-normal px-2 py-1 ml-20 rounded-lg bg-red-200 text-black dark:bg-slate-950 dark:text-white`}
              >
                <p className="px-1">{message.content}</p>
                <p className="h-fit w-full text-[10px] px-1 text-gray-700 dark:text-gray-300 flex justify-end items-end gap-0.5">
                  {/* {message.isStar && <TiStar className="h-3 w-3" />} */}
                  {message.isPinned && <Pin className="h-3 w-3" />}
                  {message.isEdited && <span>Edited</span>}
                  {formattedTime}
                  {message.status === "SEND" && (
                    <span className="text-gray-800 dark:text-gray-400 animate-flip">
                      <Check size={16} strokeWidth={1.5} />
                    </span>
                  )}
                  {message.status === "DELIVERED" && (
                    <span className="text-gray-800 dark:text-gray-400 animate-flip">
                      <CheckCheck size={16} strokeWidth={1.5} />
                    </span>
                  )}
                  {message.status === "SEEN" && (
                    <span className="text-red-500 animate-flip">
                      <CheckCheck size={16} strokeWidth={1.5} />
                    </span>
                  )}
                </p>
                <div className="absolute right-1 top-1 blur-sm bg-red-200 dark:bg-slate-950 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
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
                className={`group relative h-full w-fit font-normal px-2 ml-20 py-1 rounded-lg bg-red-200 text-black dark:bg-slate-950 dark:text-white flex items-end`}
              >
                <p className="px-1">{message.content}</p>
                <span className="h-full w-fit text-[10px] px-1 text-gray-700 dark:text-gray-300 flex items-end gap-1">
                  {/* {message.isStar && <TiStar className="h-3 w-3" />} */}
                  {message.isPinned && <Pin className="h-3 w-3" />}
                  {message.isEdited && <span>Edited</span>}
                  {formattedTime}
                  {message.status === "SEND" && (
                    <span className="text-gray-800 dark:text-gray-400 animate-flip">
                      <Check size={16} strokeWidth={1.5} />
                    </span>
                  )}
                  {message.status === "DELIVERED" && (
                    <span className="text-gray-800 dark:text-gray-400 animate-flip">
                      <CheckCheck size={16} strokeWidth={1.5} />
                    </span>
                  )}
                  {message.status === "SEEN" && (
                    <span className="text-red-500 animate-flip">
                      <CheckCheck size={16} strokeWidth={1.5} />
                    </span>
                  )}
                </span>
                <div className="absolute right-1 top-1 blur-sm bg-red-200 dark:bg-slate-950 h-6 w-6 rounded-full flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all"></div>
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
          className={`relative h-10 w-full px-4 flex justify-end mb-0.5 ${
            edit && "bg-gray-600 bg-opacity-40"
          }`}
          key={message._id}
        >
          {/* <p className="absolute right-2 top-0 rotate-90 border-t-[14px] border-t-transparent border-l-[10px] border-l-red-200 dark:border-l-slate-950"></p> */}
          <div
            className={`h-full w-fit px-2 py-1 rounded-lg bg-red-200 text-black dark:bg-slate-950 dark:text-gray-400 flex items-center`}
          >
            <Ban className="inline" />
            <p className="px-1 italic">You deleted this message</p>
            <span className="h-full text-[10px] px-1 text-black dark:text-gray-400 flex items-end">
              {formattedTime}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default SenderMessageCard;
