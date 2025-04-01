"use client";

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const DialogBox = ({
  isOpen,
  setIsOpen,
  title,
  inputBox,
  editContent,
  editContentHandler,
  primaryBtnText,
  primaryBtnAction,
  secondaryBtnText,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  inputBox: boolean;
  editContent?: string;
  editContentHandler: (value: string) => void;
  primaryBtnText: string;
  primaryBtnAction: any;
  secondaryBtnText: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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

  const primaryBtnhandler = () => {
    primaryBtnAction();
    setIsOpen(false);
  };

  const secondryBtnHandler = () => {
    closeDailogBox();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-20 h-full w-full bg-black bg-opacity-60 flex justify-center items-center">
          <dialog
            ref={dialogRef}
            className="h-fit w-fit p-6 bg-white dark:bg-gray-900 outline-none rounded-lg flex flex-col gap-4 "
          >
            <p className="mb-2">{title}</p>
            {inputBox && (
              <input
                value={editContent}
                onChange={(e) => editContentHandler(e.target.value)}
                className="h-8 w-96 outline-none border-2 border-gray-700 focus:border-blue-700 transition-all rounded-md px-2 py-1 font-normal"
              />
            )}
            <div className="flex justify-between mt-2">
              <button
                onClick={primaryBtnhandler}
                className="px-8 py-1 bg-gray-950 text-white dark:bg-blue-700 dark:text-white border-none  dark:border-2 active:scale-95 transition-all"
              >
                {primaryBtnText}
              </button>
              <button
                onClick={secondryBtnHandler}
                className="px-8 py-1 border-2 dark:border-white active:scale-95 transition-all"
              >
                {secondaryBtnText}
              </button>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};

export default DialogBox;
