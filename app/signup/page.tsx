"use client";

import Image from "next/image";
import React, { FormEvent, useState } from "react";

import TextingIllust from "@/public/Texting-pana.svg";
import axiosInstance from "@/utils/axiosinstance";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const { push } = useRouter();

  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);

  const signupHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/auth/signup`, {
        username,
        email,
        password,
        confirmPassword,
      });

      setUsername(null);
      setEmail(null);
      setPassword(null);
      setConfirmPassword(null);

      push("/signin");

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="h-full w-full flex justify-evenly items-center">
      <form onSubmit={signupHandler} className="p-10 flex flex-col gap-4">
        <h1 className="text-4xl font-semibold mb-8">
          <span className="text-red-500">Q</span>Chat
        </h1>
        <input
          className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-gray-950 border-b-2 dark:border-black focus:border-blue-500 transition-all"
          onChange={(e) => setUsername(e.target.value)}
          value={username || ""}
          type="text"
          placeholder="username"
        />
        <input
          className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-gray-950 border-b-2 dark:border-black focus:border-blue-500 transition-all"
          onChange={(e) => setEmail(e.target.value)}
          value={email || ""}
          type="text"
          placeholder="email"
        />
        <input
          className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-gray-950 border-b-2 dark:border-black focus:border-blue-500 transition-all"
          onChange={(e) => setPassword(e.target.value)}
          value={password || ""}
          type="password"
          placeholder="password"
        />
        <input
          className="px-2 py-1 rounded-sm h-10 w-72 outline-none bg-gray-200 text-gray-800 dark:text-gray-300 placeholder:text-gray-800 dark:placeholder:text-gray-600 font-medium dark:bg-gray-950 border-b-2 dark:border-black focus:border-blue-500 transition-all"
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword || ""}
          type="password"
          placeholder="confirm password"
        />
        <button
          className="bg-blue-700 rounded-md text-xl text-white font-semibold py-2 active:scale-95 transition-all mt-4"
          type="submit"
        >
          Sign up
        </button>
        <p className="text-center">
          Already have account?{" "}
          <span
            onClick={() => push("/signin")}
            className="text-blue-500 cursor-pointer"
          >
            signin
          </span>
        </p>
      </form>
      <div className="h-full w-2/4 border-l-2 border-red-500 rounded-l-full flex justify-center items-center">
        <Image
          src={TextingIllust}
          height={800}
          width={500}
          alt="Illustration"
        />
      </div>
    </main>
  );
};

export default SignupPage;
