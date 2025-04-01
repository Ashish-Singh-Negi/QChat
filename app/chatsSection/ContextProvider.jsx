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
  width: 0,
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
  setReacting: (reacting) => null,
  show: true,
  setShow: (show) => null,
  sideThreeDot: false,
  setSideThreeDot: (sideThreeDot) => null,
  side_starredMessage: false,
  setSide_starredMessages: (side_starredMessage) => null,
  selectChats: false,
  setSelectChats: (selectChats) => null,
  addChats: false,
  setAddChats: (addChats) => null,
  starred: false,
  setStarred: (starred) => null,
  storySetting: false,
  setStorySetting: (storySetting) => null,
  story: false,
  setStory: (story) => null,
  logOut: false,
  setLogOut: (logOut) => null,
  settings: false,
  setSettings: (settings) => null,
  profile: false,
  setProfile: (profile) => null,
  notificationSetting: false,
  setNotificationSetting: (notificationSetting) => null,
  privacySetting: false,
  setPrivacySetting: (privacySetting) => null,
};

const context = createContext(defaultVal);

function ContextProvider({ children }) {
  const [threeDot_btn, setThreeDot_btn] = useState(false);
  const [sent_Text, setSent_Text] = useState(false);
  const [recieve_Text, setRecieve_Text] = useState(false);
  const [width, setWidth] = useState(0);
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
  const [selectChats, setSelectChats] = useState(true);

  // sidebar
  const [show, setShow] = useState(true);
  const [sideThreeDot, setSideThreeDot] = useState(false);
  const [side_starredMessage, setSide_starredMessages] = useState(false);
  const [addChats, setAddChats] = useState(false);
  const [starred, setStarred] = useState(false);
  const [story, setStory] = useState(false);
  const [storySetting, setStorySetting] = useState(false);
  const [logOut, setLogOut] = useState(false);
  const [settings, setSettings] = useState(false);
  const [profile, setProfile] = useState(false);
  const [privacySetting, setPrivacySetting] = useState(false);
  const [notificationSetting, setNotificationSetting] = useState();

  // search bar toggle in chat box
  useEffect(() => {
    if (search) {
      setContactInfo(false);
      setDisappearingComp(false);
      setSelectChats(false);
    }
  }, [search]);

  // contact info toggle
  useEffect(() => {
    if (contactInfo) {
      setSearch(false);
      setDisappearingComp(false);
      setSelectChats(false);

    }
  }, [contactInfo]);

  useEffect(() => {
    if (disappearingComp) {
      setContactInfo(false);
      setSearch(false);
      setSelectChats(false);

    }
  }, [disappearingComp]);

  useEffect(() => {
    if (selectChats) {
      setContactInfo(false);
      setSearch(false);
      setDisappearingComp(false);

    }
  }, [selectChats]);

  useEffect(() => {
    if (show) {
      if (width < 700) {
        setSelectChats(false)
      }
      setStory(false);
      setProfile(false);
      setSettings(false);
    }
  }, [show]);

  useEffect(() => {
    if (story) {
      setShow(false);
      setStarred(false);
      setAddChats(false);
      setProfile(false);
      setSettings(false);
    }
  }, [story]);
  useEffect(() => {
    if (settings) {
      setShow(false);
      setStarred(false);
      setAddChats(false);
      setProfile(false);
      setStory(false);
    }
  }, [settings]);

  useEffect(() => {
    if (profile) {
      setShow(false);
      setStory(false);
      setStarred(false);
      setAddChats(false);
      setSettings(false);
    }
  }, [profile]);

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(selectChats, show)

  useEffect(() => {
    if (width < 700) {
      if (selectChats) {
        setShow(false);
      } else {
        setShow(true);
      }
    } else {
      setSelectChats(true)
      setShow(true);
    }
  }, [width]);

  const values = {
    notificationSetting,
    setNotificationSetting,
    settings,
    setSettings,
    profile,
    setProfile,
    privacySetting,
    setPrivacySetting,
    logOut,
    setLogOut,
    addChats,
    setAddChats,
    show,
    setShow,
    width,
    setWidth,
    setChecked,
    starred,
    story,
    setStory,
    storySetting,
    setStorySetting,
    setStarred,
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
    sideThreeDot,
    setSideThreeDot,
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
    selectChats,
    setSelectChats,
    side_starredMessage,
    setSide_starredMessages,
    setReacting,
  };

  return <context.Provider value={values}>{children}</context.Provider>;
}

export function context_val() {
  return useContext(context);
}

export default ContextProvider;
