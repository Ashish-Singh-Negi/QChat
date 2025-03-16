"use client";
import React, { useContext, useEffect } from "react";
import { createContext, useState } from "react";

const defaultVal = {
  threeDot_btn: false,
  setThreeDot_btn: (threeDot_btn) => null,
  sent_Text: false,
  setSent_Text: (sent_Text) => null,
  recieve_Text: false,
  setRecieve_Text: (recieve_Text) => null,
  search: false,
  setSearch: (search) => null,
  width: window.innerWidth,
  setWidth: (width) => null,
  contactInfo: false,
  setContactInfo: (contactInfo) => null,
  checked: false,
  setChecked: (checked) => null,
  disappearingComp :false,
  setDisappearingComp : (disappearingComp)=>null,
  mutePopUp:false,
  setMutePopUp :(mutePopUp)=>null,
  deletePopUp:false,
  setDeletePopUp :(deletePopUp)=>null,
  blockPopUp:false,
  setBlockPopUp :(blockPopUp)=>null,
  clearChatPopUp:false,
  setClearChatPopUp :(clearChatPopUp)=>null,
};

const context = createContext(defaultVal);

function ContextProvider({ children }) {
  const [threeDot_btn, setThreeDot_btn] = useState(false);
  const [sent_Text, setSent_Text] = useState(false);
  const [recieve_Text, setRecieve_Text] = useState(false);
  const [search, setSearch] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [checked, setChecked] = useState(false);
  const [ mutePopUp , setMutePopUp] = useState(false);
  const [ blockPopUp , setBlockPopUp] = useState(false);
  const [ clearChatPopUp , setClearChatPopUp] = useState(false);
  const [ deletePopUp , setDeletePopUp] = useState(false);
  const [disappearingComp , setDisappearingComp] = useState(false);

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

  const values = {
    width,
    setWidth,
    setChecked,
    threeDot_btn,
    setThreeDot_btn,
    search,
    setSearch,
    contactInfo,
    setSent_Text,
    checked,
    sent_Text,
    recieve_Text,
    setRecieve_Text,
    setContactInfo,
    disappearingComp , 
    setDisappearingComp,
    mutePopUp,
    setMutePopUp,
    blockPopUp,
    setBlockPopUp,
    deletePopUp,
    setDeletePopUp,
    clearChatPopUp,
    setClearChatPopUp
  };
  return <context.Provider value={values}>{children}</context.Provider>;
}

export function context_val() {
  return useContext(context);
}

export default ContextProvider;
