import React from "react";
import MainSec from "./MainSec";
import Profile from "./Profile";
import Settings from "./Settings";
import StarrredChats from "./StarrredChats";
import StorySettings from "./StorySettings";
import AddChats from "./AddChats";
import Story from "./Story";

function Box() {
  // const { story, profile, logOut, storySetting, settings } = context_val();
  return (
    <div>
      {/* { profile ? <Profile/> : <MainSec/> }
  {logOut && <PopUp header='LogOut?' message='are you Sure You want to log out ?' btn2='logout' />} */}

      <MainSec />
      <Story />
      <StorySettings />
      <Profile />
      <Settings />
      <StarrredChats />
      <AddChats />
    </div>
  );
}

export default Box;
