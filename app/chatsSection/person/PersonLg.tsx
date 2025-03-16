"use client";

import React, { useState, useEffect } from "react";
import { context_val } from "../ContextProvider";
import Chat from "./Chat";
import SearchMessages from "@/app/components/SearchMessages";

export default function PersonLg() {
  const { search } = context_val();

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, [window.innerWidth]);

  return (
    <div className={`${width <= 1140 && "hidden"} `}>
      <Chat
        css={search ? "global-width_md right-[35vw] " : "global-width right-0"}
      />
      {search && <SearchMessages css={"global-width_md"} />}
    </div>
  );
}
