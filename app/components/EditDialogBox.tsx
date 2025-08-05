"use client";

import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const EditDialogBox = ({
  isOpen,
  setIsOpen,
  title,
  messageContent,
  saveEditedMessageHandler,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  messageContent: string;
  saveEditedMessageHandler: (editedContent: string) => void;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [editMessageContent, setEditMessageContent] = useState(messageContent);

  useEffect(() => {
    if (isOpen) openDailogBox();
    else closeDailogBox();
  }, [isOpen]);

  function openDailogBox() {
    dialogRef.current?.showModal();
  }

  function closeDailogBox() {
    dialogRef.current?.close();
  }

  const closeEditDialogBox = () => {
    closeDailogBox();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-20 h-full w-full bg-black bg-opacity-50 flex justify-center items-center">
          <dialog
            ref={dialogRef}
            className="h-fit w-fit p-4 bg-white dark:bg-gray-950 outline-none rounded-lg flex flex-col gap-4"
          >
            <div className=" w-full flex items-center">
              <button className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-900 rounded-full mr-2 grid place-items-center">
                <X
                  onClick={() => closeEditDialogBox()}
                  className="h-6 w-6 inline cursor-pointer active:scale-95"
                />
              </button>
              <p>{title}</p>
            </div>
            <div className="h-fit w-full flex items-end rounded-t-md bg-gray-100 dark:bg-black border-b-2 border-red-500 dark:border-red-700">
              <textarea
                value={editMessageContent}
                onChange={(e) => setEditMessageContent(e.target.value)}
                className="h-20 w-96 caret-red-700 border-none bg-transparent outline-none resize-none p-1"
              ></textarea>
              <div className="flex justify-between mb-2 px-1">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    saveEditedMessageHandler(editMessageContent);
                  }}
                  className="h-8 w-8 rounded-full bg-red-700 dark:border-red-800 text-white active:scale-95 transition-all font-semibold"
                >
                  ok
                </button>
              </div>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default EditDialogBox;
