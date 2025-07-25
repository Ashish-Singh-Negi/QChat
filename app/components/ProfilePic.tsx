import { useUserInfoContext } from "@/Context/UserInfoContext";
import React from "react";

const ProfilePic = ({
  profilePic,
  username,
  setShowFullImage,
}: {
  profilePic?: string;
  username?: string;
  setShowFullImage?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { userInfo } = useUserInfoContext();

  if (!profilePic && !username && userInfo)
    return (
      <div
        className={`h-full w-full rounded-full flex justify-center items-center font-medium ${userInfo.profilePic}`}
      >
        {userInfo.username.charAt(0).toUpperCase()}
      </div>
    );

  return (
    <>
      {profilePic && profilePic.startsWith("bg-") ? (
        <div
          className={`h-full w-full rounded-full flex justify-center items-center font-medium ${profilePic}`}
        >
          {username!.charAt(0).toUpperCase()}
        </div>
      ) : setShowFullImage ? (
        <img
          src={profilePic}
          onClick={() => setShowFullImage((prevValue) => !prevValue)}
          className="h-full w-full rounded-full"
          alt="profile pic"
        />
      ) : (
        <img
          src={profilePic}
          className="h-full w-full rounded-full"
          alt="profile pic"
        />
      )}
    </>
  );
};

export default ProfilePic;
