import { FaApple, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { InitialiseOauth } from "../functionality/api-routes";
import { PageContent } from "../components/multiuse-elements";
import { useEffect, useState } from "react";
import styles from "../css/login.module.css"

function OAuthSignin({setResp}){
  async function callAPI(prov){
    const resp = await InitialiseOauth(prov);
    setResp(resp);
  }
  function getButtons () {
    const authMethods = {
      apple: {icon: <FaApple />},
      github: {icon: <FaGithub />},
      google: {icon: <FaGoogle />},
      microsoft: {icon: <FaMicrosoft />}
    }
    let buttons = [];
    for (const [prov, v] of Object.entries(authMethods)) {
      buttons.push(
        <button onClick={() => {callAPI(prov)}} key={prov}>
          {v.icon}
        </button>
      )
    }
    return buttons;
  }
  return (
    <div className={styles.oauthContainer}>
      <h4>Use OAuth</h4>
      <div className={styles.oauthButtons}>
        {getButtons().map((button) => {return button})}
      </div>
    </div>
  )
}

function EmailSignin({setResp}){
  function submitEmail(){
    console.log("click!")
    return ""
  };
  return(
    <div className={styles.emailContainer}>
      <h4> Use Email </h4>
      <input />
      <button onClick={() => {submitEmail}}>Sign In</button>
    </div>
  )
}
 
export function SignIn(){
  const [errorLine, setErrorLine] = useState();
  const [resp, setResp] = useState();
  
  useEffect(()=>{
    if (resp){
      const {error, data} = resp;
      if (error) {
        if(error.status < 500){
          setErrorLine("authentication error while signing in - please try again")
        } else{
          setErrorLine("server error while signing in - try again in a little while")
        }
        console.error(`[${error.status}] ${error.code}: ${error.message} during sign in`)
      } else if (data) {
        const pageRedirect = data.url;
        console.log("Redirecting to OAuth page...")
        window.location.href = pageRedirect
      }
    }
  }, [resp])

  return(
    <PageContent page="sign-in">
      <div className={styles.signinContainer}>
        <EmailSignin setResp={setResp} />
        <OAuthSignin setResp={setResp} />
        <p>{errorLine}</p>
      </div>
    </PageContent>
  )
}

