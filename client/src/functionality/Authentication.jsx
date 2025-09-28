import { useSession } from "@descope/react-sdk";
const CheckAuth = () => {return useSession();};

const Username = () => {
  const username = localStorage.getItem("dls_last_user_display_name");
  return username;
};

const UserPhoto = () => {
  const userPhoto = localStorage.getItem("dls_last_user_photo");
  return userPhoto;
};

export { CheckAuth, Username, UserPhoto };
