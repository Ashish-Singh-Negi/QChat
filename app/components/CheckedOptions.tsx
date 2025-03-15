"use client";
import { Trash, Star, Cross } from "../icons";
import React from "react";
import "../global.css";
import "./style.css";
import { context_val } from "../chatsSection/ContextProvider";
function CheckedOptions(data: { css: string; selected_texts: number }) {
  const { setChecked } = context_val();
  return (
    <div className={` fixed bottom-0 z-100  ${data.css}`}>
      <div className="flex justify-between color-lvl-1 w-full  p-2 ">
        <div className="flex justify-around w-[200px] ">
          <button
            onClick={() => setChecked(false)}
            className=" ml-4 text-2xl my-2 txt-color-lvl-3 text-quick-600"
          >
            {" "}
            <Cross />
          </button>
          <p className=" ml-4 text-2xl my-2 txt-color-lvl-3 text-quick-600">
            {data.selected_texts} selected{" "}
          </p>
        </div>
        <div className="flex justify-around   w-[200px] ">
          <button
            className={` ml-4 text-lg my-2  text-quick-600 ${
              data.selected_texts == 1
                ? "txt-color-lvl-3"
                : "btn-disabled text-gray-400"
            } `}
          >
            {" "}
            <Star />
          </button>
          <button
            className={` ml-4 text-lg my-2  text-quick-600 ${
              data.selected_texts != 0
                ? "txt-color-lvl-3"
                : "btn-disabled text-gray-400 "
            } `}
          >
            {" "}
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckedOptions;
