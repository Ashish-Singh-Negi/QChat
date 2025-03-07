"use client";
import React, { useState, useEffect } from "react";
import "../../global.css";
import SearchMessages from "@/app/components/SearchMessages";
import Chat from "./Chat";
import ContactInfo from "@/app/components/ContactInfo";
import Disappearing from "@/app/components/Disappearing";

function PersonMd() {
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
    <div className={`${width > 1140 && "hidden"}`}>
      <div>
        <Chat css={"global-width"} />
      </div>
      <div>
        <SearchMessages css={"global-width"} />
      </div>
      <div>
        <ContactInfo />
      </div>
      <div>
        <Disappearing />
      </div>
    </div>
  );
}

export default PersonMd;
