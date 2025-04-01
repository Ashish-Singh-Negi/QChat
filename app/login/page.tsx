"use client";

import useUserLogin from "@/hooks/useUserLogin";
import axiosInstance from "@/utils/axiosinstance";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const { login } = useUserLogin();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(" username : ", username);
    console.log(" password : ", password);

    const res = await login({ username: username!, password: password! });

    console.log(res);
  };

  const getProfile = async () => {
    try {
      const { data } = await axiosInstance.get("/profile");

      console.log("Profile : ", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={(e) => loginHandler(e)}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="text"
          placeholder="password"
        />
        <button type="submit">login</button>
      </form>

      <button className="px-2 py-1 bg-gray-600 rounded-md" onClick={getProfile}>
        getprofile
      </button>
    </>
  );
};

export default LoginPage;
