"use client";

import axiosInstance from "@/utils/axiosinstance";
import React from "react";

type FormData = {
  username: string;
  password: string;
};

type User = {
  username: string;
};

type Data = {
  data: {
    data: {
      accessToken: string;
      refreshToken: string;
      user: User;
    };
  };
};

const useUserLogin = () => {
  const login = async (formData: FormData) => {
    try {
      const { data }: Data = await axiosInstance.post(
        `auth/user/login`,
        formData
      );

      // console.log(data.data.accessToken);
      // console.log(data.data.refreshToken);

      // localStorage.setItem("access-token", data.data.accessToken);
      // localStorage.setItem("refresh-token", data.data.refreshToken);
      return data;
    } catch (error) {
      return error;
    }
  };

  return { login };
};

export default useUserLogin;
