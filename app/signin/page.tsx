"use client";

import axiosInstance from "@/utils/axiosinstance";
import Image from "next/image";
import React, { FormEvent, useState } from "react";

import chatIllust from "@/app/public/Messaging fun-amico.svg";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const { push } = useRouter();

  const loginHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axiosInstance.post(`/auth/login`, {
        username: username?.trim(),
        password: password?.trim(),
      });

      console.log(data);
      push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-full w-full flex justify-between">
      <div className="h-full w-2/3 flex justify-center items-center">
        <form className="p-10 flex flex-col gap-4" onSubmit={loginHandler}>
          <h1 className="text-4xl font-semibold mb-8">
            <span className="text-red-500">Q</span>Chat
          </h1>
          <input
            className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-black border-b-2 dark:border-black focus:border-blue-500 transition-all"
            onChange={(e) => setUsername(e.target.value)}
            value={username || ""}
            type="text"
            placeholder="username"
          />
          <input
            className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-black border-b-2 dark:border-black focus:border-blue-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
            type="text"
            placeholder="password"
          />
          <button
            className="bg-blue-700 rounded-md text-xl text-white font-semibold py-1 active:scale-95 transition-all mt-4"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </div>
      <div className="h-full w-3/4 border-l-2 border-red-500 rounded-l-full flex justify-center items-center">
        <Image src={chatIllust} height={800} width={500} alt="Illustration" />
      </div>
    </main>
  );
};

export default LoginPage;
