import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api",
  withCredentials: true,
});

// type headers = {
//  "Content-Type": string;
//   Accept: string;
//   Authorization: string;
// };

// axiosClient.defaults.headers = {
//   "Content-Type": "application/json",
//   Accept: "application/json",
// } as headers & HeadersDefaults;

axiosInstance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  async (err) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    console.log(err);

    const originalConfig = err.config;

    if (originalConfig.url !== "/api/auth/login" && err.response) {
      // access token expired

      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        // console.log("Intercepts : ", originalConfig);

        try {
          const { data } = await axiosInstance.post("/auth/refresh");

          console.log(data);

          return axiosInstance(originalConfig);
        } catch (_error: any) {
          console.log(_error);

          if (_error.status == 302) {
            window.location.href = _error.response.data.redirectUrl;
          }

          // toast.error('Session time out. Please login again.', {
          //   id: 'sessionTimeOut'
          // });
          // Logging out the user by removing all the tokens from local
          // localStorage.removeItem('access-token');
          // localStorage.removeItem('refresh-token');
          // Redirecting the user to the landing page
          // window.location.href = window.location.href = ;
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);

export default axiosInstance;
