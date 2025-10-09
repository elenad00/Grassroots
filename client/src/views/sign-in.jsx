import { FaApple, FaGithub, FaGoogle, FaMicrosoft } from "react-icons/fa";
import { InitialiseOauth, InitialiseOTPAuth } from "../functionality/api-routes";
import { Loader, PageContent, PageElement } from "../components/multiuse-elements";
import { useEffect, useState } from "react";
import { DeleteUserEmail, SetUserEmail } from "../functionality/session-storage";
import styles from "../css/login.module.css";

function OAuthSignin({setResp, setIsLoading}){
  async function callAPI(prov){
    setIsLoading(true)
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

function EmailSignin({setResp, setErrorLine, setIsLoading}){
  function verifyEmail(formData){
    // Get the email the user submitted
    const submittedEmail = formData.get("userEmail");
    // Establish the email regex - matches xyz@abc.(com|gov.uk| co.uk|edu.uk|ac.uk)
    const re = /[\d\w]+@[\w]+\.(?:(?:com)|(?:gov|co|edu|ac)\.uk)/;
    // match the submitted email against the regex
    if(re.test(submittedEmail)){
      callEmailAPI(submittedEmail);
    } else{
      setErrorLine("looks like there's an error with that email address! currently we only accept .com or .uk emails");
      console.log(`Could not parse email ${submittedEmail}`)
    }
  }
  async function callEmailAPI(email){
    setIsLoading(true)
    const resp = await InitialiseOTPAuth(email);
    SetUserEmail(email)
    setResp(resp);
  };
  return(
    <div className={styles.emailContainer}>
      <h4> Use Email </h4>
      <form action={verifyEmail}>
        <input name="userEmail" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

function HandleResponse(resp, setErrorLine){
  const {error, data} = resp;
  if (error) {
    DeleteUserEmail()
    if(error.status < 500){
      setErrorLine("authentication error while signing in - please try again")
    } else{
      setErrorLine("server error while signing in - try again in a little while")
    }
    console.error(`[${error.status}] ${error.code}: ${error.message} during sign in`)

  } else if (data) {
    if(data.url){
      const pageRedirect = data.url;
      window.location.href = pageRedirect
    } else{
      window.location.href = "/sign-in/auth/otp"
    }
  }
}
export default function SignIn(){
  const [errorLine, setErrorLine] = useState();
  const [resp, setResp] = useState();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(()=>{
    if (resp){
      HandleResponse(resp, setErrorLine)
    }
  }, [resp])

  let pageContent;
  if(isLoading){
    pageContent = (
      <PageElement>
        {Loader}
      </PageElement>
    )
  } else{
    pageContent = (
      <>
        <EmailSignin setResp={setResp} setErrorLine={setErrorLine} setIsLoading={setIsLoading}  />
        <OAuthSignin setResp={setResp} setIsLoading={setIsLoading} />
        <p>{errorLine}</p>
      </>
    )
  }

  return(
    <PageContent page="sign-in">
      <div className={styles.signinContainer}>
        {pageContent}
      </div>
    </PageContent>
  )
}

