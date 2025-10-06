import { useDescope, useSession } from "@descope/react-sdk";
import { useEffect, useState } from "react";

export function InitialAuth () {
  const [authorised, setAuthorised] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const authCode = searchParams.get("code");
  const descopeClient = useDescope();
  const session = useSession();

  useEffect(() => {
    async function getAuth ({authCode}) {
      try{
        await descopeClient.oauth.exchange(authCode);
      } catch(error){
        console.log(`Handshake returned ${error.code}: ${error.message}`)
      }
      try{
        await descopeClient.refresh();
      } catch(error){
        console.log(`Refresh returned ${error.code} : ${error.message}` )
      }
    }
    getAuth({authCode});
  }, [])

  useEffect(() => {
    if (session.sessionToken && session.isAuthenticated && !session.isSessionLoading){
      setAuthorised(true)
    }
  }, [session.isSessionLoading]) 

  if (authorised){
    window.location.href = "/"
  }
}