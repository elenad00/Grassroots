import config from "../functionality/Config";
import { FaApple, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import DescopeSdk from '@descope/web-js-sdk';
import { useState } from "react";
import styles from "../css/login.module.css";
import "../css/multiuse.css";

const SignIn = () => {
  const [userEmail, setUserEmail] = useState('');
  const OAuthProviders = [
    {logo: <FaApple/>, provider: "apple"}, 
    {logo: <FaGithub/>, provider: "github"}, 
    {logo: <FaGoogle/>, provider: "google"}, 
    {logo: <FaMicrosoft/>, provider: "microsoft"}
  ]

  const handleOAuthSignin = async (providerName) => {
    const sdk = DescopeSdk({
      persistTokens: true,
      projectId: config.AUTH.PROJECT_ID
    });
    const resp = await sdk.oauth.start[providerName](
      config.AUTH.REDIRECT_URL,
      {"stepup": false, "mfa": false}
    )
    if (!resp.ok) {
      console.log("Failed to start OAuth: "+ resp);
    } else {
      window.location.href=resp.data.url;
    }
  }

  const handleEmailSignin = async() => {
    return userEmail;
  }

  return (
    <div className = {styles.signInPanel}>
      <h1> Hey! Welcome to Grassroots </h1>
      <p> Grassroots is London's hub for connecting venues, artists and gig-lovers. And we're so happy to have you join us.</p>
      <div className={styles.signinContainer}>
        <div className={styles.emailLoginContainer}>
          <input placeholder="Email Address" onChange={(e) => setUserEmail(e.target.value)}/>
          <button 
            className="containerButton" 
            onClick={() => handleEmailSignin()}
          > Continue </button>
        </div>
        <div className={styles.socialLoginContainer}>
          {OAuthProviders.map((provider, i) => {
            return (
              <button 
                key={i} 
                onClick={() => handleOAuthSignin(provider.provider)}
              >
                {provider.logo}
              </button>
            )
          })}
        </div>
      </div>
    </div> 
  );
};

export default SignIn;