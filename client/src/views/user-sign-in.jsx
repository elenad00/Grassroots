import axios from "axios";
import { FaApple, FaGoogle, FaGithub, FaMicrosoft}  from "react-icons/fa";
import { PageContent, PageElement } from "../components/multiuse-elements";
import styles from "../css/authentication.module.css";
import { useState } from "react";

const api = axios.create({baseUrl: "/api/v1"});

export default function SignIn(){
  const [error, setError] = useState('');

  const authMethods = {
    apple: <FaApple />,
    github: <FaGithub />,
    google: <FaGoogle />,
    microsoft: <FaMicrosoft />
  }

  async function oauth_handshake(provider, setErrorLine){
    const api_url = "/auth/sign-in/oauth/"+provider;
    const {error, data} = await api.get(api_url);
    if (error){
      error.user_message = "Error error while signing in - please try again!";
      handle_error(setErrorLine, error)
    } else {
      window.location.href = resp.data.redirect_url;
    }
  }

  function verify_email(e, setErrorLine){
    const email = e.get('email');
    const re = /[\d\w]+@[\w]+\.(?:(?:com)|(?:gov|co|edu|ac)\.uk)/;
    if (re.test(email)){
      send_email(email, setErrorLine)
    } else {
      setErrorLine("It looks like there's an error with that email address! Currently we only accept .com or .uk emails")
    }
  }

  async function send_email(email, setErrorLine){
    const {error, data} = await get_otp_code(email)
    if(error){
      error.user_message = "Error while signing in - please try again!"
      handle_error(setErrorLine, error)
    } else {
      window.location.href = "/sign-in/auth/otp"
    }
  }

  return(
    <PageContent page="sign-in">
      <PageElement>
        <div className={styles.emailContainer}>
          <h4> Use Email </h4>
          <form action={(e) => verify_email(e, setError)}>
            <input type="text" name="email" />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={styles.oauthContainer}>
          <h4>Use OAuth</h4>
          <div>
            {Object.entries(authMethods).map(([provider, icon]) => (
              <button onClick={()=>(oauth_handshake(provider, setError))} key={provider}>
                {icon}
              </button>
            ))}
          </div>
        </div>
        <p>{error}</p>
      </PageElement>
    </PageContent>
  )
}