import { useDescope, useSession } from "@descope/react-sdk";
import { useEffect, useState } from "react";

export function InitialAuth () {
  const [authorised, setAuthorised] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const authCode = searchParams.get("code");
  const descopeClient = useDescope();
  let {isSessionLoading, sessionToken, claims, isAuthenticated} = useSession();

  useEffect(() => {
    async function getAuth ({authCode}) {
      try{
        const dsExchangeResp = await descopeClient.oauth.exchange(authCode);
      } catch(error){
        console.log(`Handshake returned ${error.code}: ${error.message}`)
      }
      try{
        const dsRefresh = await descopeClient.refresh();
      } catch(error){
        console.log(`Refresh returned ${error.code} : ${error.message}` )
      }
    }
    getAuth({authCode});
  }, [])

  useEffect(() => {
    if (sessionToken && isAuthenticated && !isSessionLoading){
      setAuthorised(true)
    }
  }, [isSessionLoading]) 

  if (authorised){
    window.location.href = "/"
  }
}