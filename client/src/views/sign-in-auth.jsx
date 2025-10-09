import { ExchangeAuthCode, ExchangeOTP } from "../functionality/api-routes";
import OTPInput from "../components/otp-code-input";
import { NavButton, PageContent, PageElement, Loader } from "../components/multiuse-elements";
import { DeleteUserEmail, SetJWTs, SetUsername } from "../functionality/session-storage";
import styles from "../css/login.module.css"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function HandleUserData(data){
  const {jwts, userData} = data;
  DeleteUserEmail();
  SetJWTs(jwts)
  if (!userData.firstSeen){
    SetUsername(userData.username)
    window.location.href = "/user";
  } else {
    window.location.href = "/user/join"
  }
}

export function AuthOAuth(){
  const [resp, setResp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLine, setErrorLine] = useState("Loading...");
  const [searchParams, _] = useSearchParams();
  
  useEffect(()=>{
    if(resp){
      const {error, data} = resp;
      if(error){
        isLoading(false);
        setErrorLine("Could not complete token handshake");
        console.log(`[${error.status}] ${error.code}: ${error.message} `)
      }{
        HandleUserData(data)
      }
    }
  }, [resp])

  useEffect(()=>{
    const token = searchParams.get("code");
    async function ExchangeTokens(){
      setIsLoading(true)
      const resp = await ExchangeAuthCode(token);
      setResp(resp)
    }
    ExchangeTokens(token)
  }, [])

  return (
    <PageContent>
      <PageElement>
        { isLoading 
          ? Loader
          : (
            <>
              <p>{errorLine}</p>
              <NavButton content={{link:"/sign-in", title:"Try another method"}} />
            </>
          )
        }
      </PageElement>
    </PageContent>
  )
}

export function AuthOTP(){
  // set the callbacks required for this process
  const [resp, setResp] = useState(false);
  const [code, setCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLine, setErrorLine] = useState();
  const [displayButton, setDisplayButton] = useState(false);
  
  // when the value of code is changed using the callback, submit it to the API
  useEffect(() => {
    async function SubmitCode(code){
      setIsLoading(true);
      const r = await ExchangeOTP(code);
      setResp(r);
    }
    if(code){
      SubmitCode(code)
    }
  }, [code])

  // when the value of response changes, handle it appropriately
  useEffect(()=>{
    if(resp){
      const {error, data} = resp;
      if(error){
        DeleteUserEmail();
        setIsLoading(false);
        if (error.code == "E061104"){
          setErrorLine("Oops - looks like that code has expired");
        } else if(error.code == "E061103"){
          setErrorLine("Oops - looks like you've tried too many times with that code");
        } else{
          setErrorLine("Hmm, looks like that passcode isn't correct!");
        }
        setDisplayButton(true);
        console.log(`[${error.status}] ${error.code}: ${error.message} `)
      } else {
        HandleUserData(data)
      }
    }
  }, [resp])

  let pageContent;
  if(isLoading){
    pageContent = (
      <PageElement>
        {PageLoading}
      </PageElement>
    )
  } else{
    pageContent = (
      <div className={styles.otpPage}>
        <OTPInput setCompleteCode={setCode} setErrorLine={setErrorLine} />
        <p className={styles.errorLine}>{errorLine}</p>
        {displayButton &&
          <NavButton content={{link:'/sign-in', title:'Try Another Method'}} />
        }
      </div>
    )
  }

  return (
    <PageContent page="sign-in-otp">
      {pageContent}
    </PageContent>
  )
}
