"use client";
import React, { useContext } from "react";
import { createContext, useState } from "react";

const defaultVal = {
  threeDot_btn: false,
  setThreeDot_btn: (threeDot_btn) => null,
  sent_Text: false,
  setSent_Text: (sent_Text) => null,
  recieve_Text: false,
  setRecieve_Text: (recieve_Text) => null,
};
const context = createContext(defaultVal);
function ContextProvider({ children }) {
  
  const [threeDot_btn, setThreeDot_btn] = useState(false);
  const [sent_Text, setSent_Text] = useState(false);
  const [recieve_Text , setRecieve_Text] = useState(false);

  const values = {
    threeDot_btn,
    setThreeDot_btn,
    sent_Text,
    setSent_Text,
    recieve_Text,
    setRecieve_Text
  };
  return (
    <context.Provider value={values}>
      {children}
    </context.Provider>
  );
}

export function context_val(){
  return useContext(context);
}

export default ContextProvider;
