import { useSession, useUser } from "@descope/react-sdk";
import { useEffect, useState } from "react";

export function getUserDetails(setUserInfo){
  const session = useSession()
  const {isUserLoading, user} = useUser();
  useEffect(()=>{
    if(!isUserLoading && !session.isSessionLoading) {
      const formattedUserData = {
        username: user.name,
        photo: user.picture,
        email: user.email
      }
    setUserInfo(formattedUserData)
    }
  },[session.isSessionLoading, user])
}

export function getUsername(){
  const [userInfo, setUserInfo] = useState();
  getUserDetails(setUserInfo);
  if (userInfo){
    return userInfo.username;
  };
};

export function getUserPhoto(){
  const [userInfo, setUserInfo] = useState();
  getUserDetails(setUserInfo);
  if (userInfo){
    return userInfo.picture;
  };
};
