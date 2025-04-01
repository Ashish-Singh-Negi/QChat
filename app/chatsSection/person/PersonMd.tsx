"use client";

import React, { useState, useEffect } from "react";
import "../../global.css";
import SearchMessages from "@/app/components/SearchMessages";
import Chat from "./Chat";
import ContactInfo from "@/app/components/ContactInfo";
import Disappearing from "@/app/components/Disappearing";
import { context_val } from "../ContextProvider";

function PersonMd() {
  const [width, setWidth] = useState(0);
  const { show } = context_val();

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, [width]);

  return (
    <div className={`${width > 1140 && "hidden"}`}>
      <div className={`${width < 700 ? (show ? "flex" : "hidden") : "flex"}`}>
        {" "}
        <div>
          <Chat css={"global-width"} />
        </div>
        <div>
          <SearchMessages css={"global-width"} />
        </div>
        <div>
          <ContactInfo css={"global-width"} />
        </div>
        <div>
          <Disappearing css={"global-width"} />
        </div>{" "}
      </div>
    </div>
  );
}

export default PersonMd;
