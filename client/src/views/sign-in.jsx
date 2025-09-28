import config from "../functionality/Config";
import { AuthProvider, Descope, useUser } from "@descope/react-sdk";
import { Username } from "../functionality/Authentication";
import styles from "../css/login.module.css";
import { useEffect, useState } from "react";
import "../css/multiuse.css";

const SignIn = () => {
  const DescopeHolder = () => {
    return (
      <AuthProvider projectId={config.AUTH.PROJECT_ID}>
        <Descope
          flowId="sign-user-up"
          theme="light"
        />
      </AuthProvider>
    )
  }
  return (
    <div className = {styles.signInPanel}>
      <h1> Hey! Welcome to Grassroots </h1>
      <p> Grassroots is London's hub for connecting venues, artists and gig-lovers. And we're so happy to have you join us.</p>
      <div className={styles.signinContainer}>
        <DescopeHolder />
      </div>
    </div> 
  );
};

export default SignIn;