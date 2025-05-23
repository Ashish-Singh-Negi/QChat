"use client";

import axiosInstance from "@/utils/axiosinstance";
import React, { FormEvent, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post(`auth/user/login`, {
        username: username?.trim(),
        password: password?.trim(),
      });

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <input
        onChange={(e) => setUsername(e.target.value)}
        value={username || ""}
        type="text"
        placeholder="username"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password || ""}
        type="text"
        placeholder="password"
      />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginPage;
