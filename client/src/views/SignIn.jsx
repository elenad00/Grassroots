import { SignUpOrInFlow , useUser, useSession} from "@descope/react-sdk";
import { redirect } from "react-router";

import styles from "../css/login.module.css";

const SignIn = () => {
  const handleSignIn = (e) => {
    const username = e.detail.user.customAttributes.username;
    redirect(`/users/${username}`);
  }
  return (
    <div className = {styles.signInPanel}>
      {/* use descope for login */}
      <SignUpOrInFlow
        onSuccess={(e) => {handleSignIn(e)}}
        onError={(err) => {console.log("Error!", err)}}
      />
    </div> 
  );
};

export default SignIn;