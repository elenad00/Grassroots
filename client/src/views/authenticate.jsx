import { PageContent, PageElement } from "../components/multiuse-elements";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { ExchangeAuthCode } from "../functionality/api-routes";

function HandleOauth(data){
  console.log(data)
  const {jwts, userData} = data;
  window.sessionStorage.setItem("jwt_sessionToken", jwts.session)
  window.sessionStorage.setItem("jwt_refreshToken", jwts.refresh)

  if (userData.username){
    window.sessionStorage.setItem("username", userData.username)
    window.location.href = "/user";
  } else if (userData.firstSeen){
    console.log("Render enter username page")
  }
}

async function ExchangeTokens(setResp, token){
  const resp = await ExchangeAuthCode(token);
  setResp(resp)
}

export function Authenticate(){
  const [resp, setResp] = useState(false);
  const [errorLine, setErrorLine] = useState("Loading...");
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get("code");

  useEffect(()=>{
    if(resp){
      const {error, data} = resp;
      if(error){
        setErrorLine("Could not complete token handshake");
        console.log(`[${error.status}] ${error.code}: ${error.message} `)
      }{
        HandleOauth(data)
      }
    }
  }, [resp])

  useEffect(()=>{
    ExchangeTokens(setResp, token)
  }, [])

  return (
    <PageContent>
      <PageElement>
        {errorLine}
      </PageElement>
    </PageContent>
  )
}

