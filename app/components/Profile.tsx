import { useUserInfoContext } from "@/Context/UserInfoContext";
import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

const Profile = () => {
  const { userInfo } = useUserInfoContext();

  const [viewFullImage, setViewFullImage] = useState(false);
  const [editProfile, setEditProfile] = useState(false);

  return (
    <div className="px-2 border-l-2 border-blue-500 flex items-center gap-2">
      {userInfo?.profilePic ? (
        <img
          onClick={() => setViewFullImage(!viewFullImage)}
          src={userInfo?.profilePic}
          className={`h-14 w-14 rounded-full cursor-pointer`}
          alt="profile picture"
        />
      ) : (
        <FaUserCircle className="h-14 w-14" />
      )}
      {viewFullImage && (
        <div
          onClick={() => setViewFullImage(!viewFullImage)}
          className="absolute z-10 bg-black bg-opacity-40 top-0 left-0 h-full w-full flex justify-center items-center"
        >
          <img
            src={userInfo?.profilePic ? userInfo.profilePic : ""}
            className={`h-96 w-96 cursor-pointer`}
            alt="profile picture"
          />
        </div>
      )}
      {editProfile && (
        <div className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 h-full w-full flex justify-center items-center">
          <main className=" h-fit w-[460px] border-2 border-gray-800 bg-gray-950 flex flex-col gap-4 p-8 rounded-lg">
            <div className="h-fit w-full flex justify-between mb-8">
              <p className="text-xl font-semibold">Profile</p>
              <button
                onClick={() => setEditProfile(!editProfile)}
                className="h-fit w-fit flex justify-end text-gray-500 active:scale-90 transition-all"
              >
                <IoMdClose className="h-6 w-6" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <FaUser className="h-6 w-6" />
              <div className="w-full flex flex-col">
                <label className="text-xs mb-1 px-1 font-medium">
                  username
                </label>
                <input
                  type="text"
                  className="h-10 w-full px-2 py-1 outline-none border-2 bg-gray-900 border-black rounded-md focus:border-blue-500 transition-all"
                  value={userInfo?.username}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MdOutlineAlternateEmail className="h-6 w-6" />
              <div className="w-full flex flex-col">
                <label className="text-xs mb-1 px-1 font-medium">email</label>
                <input
                  type="text"
                  className="h-10 w-full px-2 py-1 outline-none border-2 bg-gray-900 border-black rounded-md focus:border-blue-500 transition-all"
                  value={userInfo?.email}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full flex flex-col">
                <label className="text-xs mb-1 px-1 font-medium">About</label>
                <textarea
                  placeholder="write something..."
                  className="h-40 w-full p-2 outline-none border-2 bg-gray-900 border-black rounded-md focus:border-blue-500 mb-4 transition-all resize-none "
                ></textarea>
              </div>
            </div>
          </main>
        </div>
      )}
      <div
        onClick={() => setEditProfile(!editProfile)}
        className="cursor-pointer"
      >
        <p className="font-medium">{userInfo?.username}</p>
        <p>{userInfo?.email}</p>
      </div>
    </div>
  );
};

export default Profile;
