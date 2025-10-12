import { DeleteUserLoginId, SetJWTs, SetUsername } from "../client/src/functionality/session-storage";
import { ExchangeAuthCode, ExchangeOTP } from "../client/src/functionality/api-routes";
import { NavButton, PageContent, PageElement, Loader } from "../client/src/components/multiuse-elements";
import styles from "../css/authentication.module.css"
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

function HandleUserData(data){
  const {jwts, userData} = data;
  SetJWTs(jwts)
  if (!userData.firstSeen){
    SetUsername(userData.username)
    window.location.href = "/user/profile";
  } else {
    window.location.href = "/user/join"
  }
}

export function AuthOAuth(){
  const [resp, setResp] = useState(false);
  const [searchParams, _] = useSearchParams();
  const [pageContent, setPageContent] = useState(Loader)
  
  useEffect(() => {
    if (resp){
      const {error, data} = resp;
      if(error){
        setPageContent(
          <PageElement>
            <p>Could not complete token handshake</p>
            <NavButton content={{link:'/sign-in', title:'Go Back'}} />
          </PageElement>
        );
        console.log(`[${error.status}] ${error.code}: ${error.message} `)
      } else {
        HandleUserData(data)
      }
    }
  }, [resp])

  useEffect(()=>{
    async function ExchangeTokens(){
      const resp = await ExchangeAuthCode(token);
      setResp(resp)
    }
    const token = searchParams.get("code");
    ExchangeTokens(token)
  }, [])

  return (
    <PageContent>
      {pageContent}
    </PageContent>
  )
}

export function AuthOTP(){
  // set the callbacks required for this process
  const [resp, setResp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorLine, setErrorLine] = useState();
  const [errorRaised, setErrorRaised] = useState(false);
  // Refs to control each cell - begins as an array of null values
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const code = [false, false, false, false, false, false];
  const oauthPage = (
    <div className={styles.otpPage}>
      <div className={`${styles.codeInput}`}>
        {[0,1,2,3,4,5].map((i) => (
          <input
            className={styles.input}
            key={i} type="string"
            maxLength={1} ref={inputRefs[i]}
            autoFocus={i === 0} onFocus={handleFocus}
            onKeyDown={(e) => handleInput(e, i)}
            onChange={(e) => handleInput(e, i)}
          />
        ))}
      </div>
      <p className={`${styles.error} ${errorRaised ? styles.errorActive : ''}`}>
        please ensure you enter only numbers
      </p>
      <p className={styles.errorLine}>{errorLine}</p>
      {errorLine &&
        <NavButton content={{link:'/sign-in', title: 'Try Another Method'}} />
      }
    </div>
  );

  function handleFocus(e) {e.target.select()};
  function checkCode(){
    // if the filter has a length, then there are still false values, otherwise, parse the code and send to the api
    code.filter((value) => !value).length 
    && submitCode()
  };
  function handleInput(e, i){
    if (e.keyCode){
      // if the backspace has been called delete the value from the code list
      if (e.keyCode == 8){
        code[i] = false;
        if (!e.target.value && i>0) {
          // if there is no target value and the user isn't on the first cell, go back a cell
          inputRefs[i-1].current.focus()
        }
      }
    } else if (e.target.value){
      // handle a new value against the number regex
      if (/[0-9]/.test(e.target.value)){
        inputRefs[i].current.className = styles.input;
        setErrorRaised(false)
        // if the value passes, add it to the code array
        code[i] = e.target.value;
        // check to see if the code is complete
        let complete = checkCode();
        // otherwise go forward a cell
        if(!complete && i<5){
          inputRefs[i+1].current.select();
        }
      } else{
        // if the input is not a number, change its background
        inputRefs[i].current.className = styles.badInput
        setErrorRaised(true)
      }
    } else {
      // handle residual null values
      return
    }
  };
  async function submitCode(){
    setIsLoading(true);
    const joinedCode = code.join()
    const r = await ExchangeOTP(joinedCode);
    setResp(r);
  };
  
  // when the value of response changes, handle it appropriately
  useEffect(()=>{
    function HandleError(error){
      setIsLoading(false);
      if (error.code == "E061104"){
        setErrorLine("Oops - looks like that code has expired");
      } else if(error.code == "E061103"){
        setErrorLine("Oops - looks like you've tried too many times with that code");
      } else{
        setErrorLine("Hmm, looks like that passcode isn't correct!");
      }
      console.log(`[${error.status}] ${error.code}: ${error.message} `)
    }
    if(resp){
      DeleteUserEmail();
      const {error, data} = resp;
      error ? HandleError(error) : HandleUserData(data)
    }
  }, [resp])

  return (
    <PageContent page="sign-in-otp">
      { isLoading ? {Loader} : {oauthPage} }
    </PageContent>
  )
}
