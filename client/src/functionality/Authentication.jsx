import {useUser, useSession} from "@descope/react-sdk";

const CheckAuth = () => {
  const {isAuthenticated, _, __} = useSession();
  return isAuthenticated;
}

const Username = () => {
  const {user, isUserLoading} = useUser();
  if (isUserLoading || !user){
    return false
  }
  return user.customAttributes.username;
}

const UserPhoto = () => {
  const {user, isUserLoading} = useUser();
  if (isUserLoading || !user){
    return ""
  }
  return user.picture;
}

export {CheckAuth, Username, UserPhoto};
    