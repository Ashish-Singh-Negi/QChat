import { useUserInfoContext } from "@/Context/UserInfoContext";
import React from "react";

import ProfilePic from "./ProfilePic";
import { AtSign, UserRound} from "lucide-react";

const UserProfile = () => {
  const { userInfo } = useUserInfoContext();

  // const [showFullImage, setShowFullImage] = useState(false);
  // const [editProfile, setEditProfile] = useState(false);

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
    <main className=" h-full w-full bg-white flex flex-col gap-4 py-4 px-8 dark:bg-black">
      <header className="h-fit w-full flex justify-between">
        <p className="text-xl font-semibold">Profile</p>
      </header>
      <div className="h-40 w-full rounded-full flex justify-center">
        <div className="h-40 w-40 text-5xl">
          <ProfilePic
            profilePic={userInfo.profilePic!}
            username={userInfo.username!}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <UserRound className="h-6 w-6 text-red-600" />
        <div className="w-full flex flex-col">
          <label className="text-xs mb-1 px-1 font-medium">username</label>
          <input
            type="text"
            className="h-10 w-full px-2 py-1 outline-none border-b-2 focus:border-red-600 dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 transition-all"
            value={userInfo.username}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <AtSign className="h-6 w-6 text-red-600" />
        <div className="w-full flex flex-col">
          <label className="text-xs mb-1 px-1 font-medium">email</label>
          <input
            type="text"
            className="h-10 w-full px-2 py-1 outline-none border-b-2 focus:border-red-600 dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 transition-all"
            value={userInfo.email}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-full flex flex-col">
          <label className="text-xs mb-1 px-1 font-medium">About</label>
          <textarea
            placeholder="write something..."
            className="h-40 w-full p-2 outline-none border-b-2 focus:border-red-600 dark:bg-gray-900 dark:border-gray-800 rounded-t-md dark:focus:border-red-900 mb-4 transition-all resize-none "
          ></textarea>
        </div>
      </div>
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
