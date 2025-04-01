"use client";

import axiosInstance from "@/utils/axiosinstance";

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

      return data;
    } catch (error) {
      return error;
    }
  };

  return { login };
};

export default useUserLogin;
