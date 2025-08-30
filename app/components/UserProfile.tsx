import { useUserInfoContext } from "@/Context/UserInfoContext";
import React, { useEffect, useState } from "react";

import ProfilePic from "./ProfilePic";
import { AtSign, UserRound } from "lucide-react";
import axiosInstance from "@/utils/axiosinstance";
import toast from "react-hot-toast";

const UserProfile = () => {
  const { userInfo, setUserInfo } = useUserInfoContext();

  // const [showFullImage, setShowFullImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  // const [profilePic, setProfilePic] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [about, setAbout] = useState<string>();

  useEffect(() => {
    if (!userInfo) return;
    setEmail(userInfo?.email);
    setAbout(userInfo?.about ? userInfo?.about : "");
  }, [userInfo]);

  useEffect(() => {
    if (!about) return;
    const aboutIs = about?.trim() === "" ? "" : about.trim();

    if (aboutIs !== userInfo?.about) {
      setEditProfile(true);
    } else setEditProfile(false);
  }, [about]);

  const cancelhandler = () => {
    setAbout(userInfo?.about ? userInfo?.about : "");
  };

  const saveChangesHandler = async () => {
    try {
      const { data }: { data: any } = await axiosInstance.patch(
        `/users/profile`,
        {
          about: about,
        }
      );
      console.log(data);

      setEditProfile(false);

      setUserInfo(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. profile not updated");
      setAbout(userInfo?.about);
    }
  };

  if (!userInfo) return;

  return (
    // <div className="px-2 border-l-2 border-blue-500 flex items-center gap-2">
    //   <div className="h-14 w-14 cursor-pointer text-2xl">
    //     <ProfilePic
    //       profilePic={userInfo.profilePic!}
    //       username={userInfo.username!}
    //       setShowFullImage={setShowFullImage}
    //     />
    //   </div>
    //   {showFullImage && (
    //     <div
    //       onClick={() => setShowFullImage(!showFullImage)}
    //       className="absolute z-10 bg-black bg-opacity-40 top-0 left-0 h-full w-full flex justify-center items-center"
    //     >
    //       <div className="h-96 w-96">
    //         <ProfilePic
    //           profilePic={userInfo.profilePic!}
    //           username={userInfo.username!}
    //         />
    //       </div>
    //     </div>
    //   )}
    //   {editProfile && (
    <main className="h-full w-full bg-red-50 flex flex-col gap-4 py-4 px-6 dark:bg-black">
      <header className="h-fit w-full flex justify-between">
        <p className="text-xl font-semibold text-black dark:text-white">
          Profile
        </p>
      </header>
      <section className="h-fit w-full flex flex-col gap-4">
        <div className="h-40 w-full rounded-full flex justify-center">
          <div className="h-40 w-40 text-5xl">
            <ProfilePic
              profilePic={userInfo.profilePic!}
              username={userInfo.username!}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UserRound className="h-6 w-6 text-red-600 mt-4" />
          <div className="w-full flex flex-col">
            <label className="text-xs mb-1 px-1 font-medium">username</label>
            <input
              type="text"
              value={userInfo.username}
              disabled
              className="h-10 w-full px-2 py-1 outline-none border-b-2 caret-red-500 focus:border-red-600 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <AtSign className="h-6 w-6 text-red-600 mt-4" />
          <div className="w-full flex flex-col">
            <label className="text-xs mb-1 px-1 font-medium">email</label>
            <input
              type="text"
              defaultValue={email}
              disabled
              className="h-10 w-full px-2 py-1 outline-none border-b-2 caret-red-500 focus:border-red-600 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-full flex flex-col">
            <label className="text-xs mb-1 px-1 font-medium">About</label>
            <textarea
              placeholder="write something..."
              defaultValue={about}
              onChange={(e) => setAbout(e.target.value)}
              className="h-40 w-full p-2 caret-red-500 outline-none border-b-2 focus:border-red-600 text-black dark:text-white bg-white dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 mb-4 transition-all resize-none "
            ></textarea>
          </div>
        </div>
      </section>
      {editProfile && (
        <div className="h-10 w-full flex gap-20 font-medium">
          <button
            onClick={() => cancelhandler()}
            className="h-10 w-full rounded-md active:scale-95 transition-all border-2 border-red-600 text-red-600"
          >
            Cancel
          </button>
          <button
            onClick={() => saveChangesHandler()}
            className="h-10 w-full rounded-md active:scale-95 transition-all bg-red-600 text-white"
          >
            Save
          </button>
        </div>
      )}
    </main>
    //   )}
    //   <div
    //     onClick={() => setEditProfile(!editProfile)}
    //     className="cursor-pointer"
    //   >
    //     <p className="font-medium">{userInfo.username}</p>
    //     <p>{userInfo.email}</p>
    //   </div>
    // </div>
  );
};

export default UserProfile;
