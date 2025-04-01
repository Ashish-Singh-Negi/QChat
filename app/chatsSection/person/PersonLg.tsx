"use client";

import React, { useState, useEffect } from "react";
import { context_val } from "../ContextProvider";
import Chat from "./Chat";
import SearchMessages from "@/app/components/SearchMessages";
import ContactInfo from "@/app/components/ContactInfo";
import Disappearing from "@/app/components/Disappearing";
import MainSec from "@/app/components/SideBar/MainSec";

export default function PersonLg() {
  const { search, contactInfo, disappearingComp } = context_val();

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
    <div className={`${width <= 1140 && "hidden"}  `}>
      <Chat
        css={
          search || contactInfo || disappearingComp
            ? "global-width_md right-[35vw] "
            : "global-width right-0"
        }
      />
      {search && <SearchMessages css={"global-width_md"} />}
      {contactInfo && <ContactInfo css={"global-width_md"} />}
      {disappearingComp && <Disappearing css={"global-width_md"} />}
    </div>
  );
}
