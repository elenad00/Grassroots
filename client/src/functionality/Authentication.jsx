import { useUser, useSession } from "@descope/react-sdk";

const CheckAuth = () => { return useSession(); };

const Username = () => {
  const { user, isUserLoading } = useUser();
  return (isUserLoading || !user) ? false : user.customAttributes.username;
};

const UserPhoto = () => {
  const { user, isUserLoading } = useUser();
  return (isUserLoading || !user) ? "" : user.picture;
};

export { CheckAuth, Username, UserPhoto };
