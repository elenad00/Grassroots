import { useSession, useUser } from "@descope/react-sdk";
import { useEffect, useState } from "react";

export function getUserDetails(setUserInfo){
  const session = useSession()
  const {isUserLoading, user} = useUser();
  useEffect(()=>{
    if(!isUserLoading && !session.isSessionLoading) {
      let formattedUserData;
      if (user){
        formattedUserData = {
          username: user.name,
          photo: user.picture,
          email: user.email
        }
      } else{
        formattedUserData = {
          username: false,
          photo: false,
          email: false
        }
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
