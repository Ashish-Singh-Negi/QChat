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
  disappearingComp: false,
  setDisappearingComp: (disappearingComp) => null,
  mutePopUp: false,
  setMutePopUp: (mutePopUp) => null,
  deletePopUp: false,
  setDeletePopUp: (deletePopUp) => null,
  blockPopUp: false,
  setBlockPopUp: (blockPopUp) => null,
  clearChatPopUp: false,
  setClearChatPopUp: (clearChatPopUp) => null,
  visibility: false,
  setVisibility: (visibility) => null,
  selectedMessage: "",
  setSelectedMessage: (selectedMessage) => null,
  replying: false,
  setReplying: (replying) => null,
  reacting: false,
  setReacting: (reacting) => null
};

const context = createContext(defaultVal);

function ContextProvider({ children }) {
  const [threeDot_btn, setThreeDot_btn] = useState(false);
  const [sent_Text, setSent_Text] = useState(false);
  const [recieve_Text, setRecieve_Text] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  // three dot contents ...
  const [search, setSearch] = useState(false);
  const [contactInfo, setContactInfo] = useState(false);
  const [disappearingComp, setDisappearingComp] = useState(false);
  const [checked, setChecked] = useState(false);
  const [mutePopUp, setMutePopUp] = useState(false);
  const [blockPopUp, setBlockPopUp] = useState(false);
  const [clearChatPopUp, setClearChatPopUp] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  //  message states
  const [visibility, setVisibility] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [replying, setReplying] = useState(false);
  const [reacting, setReacting] = useState(false);

  useEffect(() => {
    if (search) {
      setContactInfo(false);
      setDisappearingComp(false);
    }
  }, [search]);

  useEffect(() => {
    if (contactInfo) {
      setSearch(false);
      setDisappearingComp(false);
    }
  }, [contactInfo]);

  useEffect(() => {
    if (disappearingComp) {
      setContactInfo(false);
      setSearch(false);
    }
  }, [disappearingComp]);

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
    blockPopUp,
    setBlockPopUp,
    search,
    setSearch,
    contactInfo,
    setSent_Text,
    checked,
    sent_Text,
    recieve_Text,
    visibility,
    setVisibility,
    setRecieve_Text,
    setContactInfo,
    disappearingComp,
    setDisappearingComp,
    mutePopUp,
    setMutePopUp,
    deletePopUp,
    setDeletePopUp,
    clearChatPopUp,
    setClearChatPopUp,
    selectedMessage,
    setSelectedMessage,
    replying,
    setReplying,
    reacting,
    setReacting
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}

export function context_val() {
  return useContext(context);
}

export default ContextProvider;
