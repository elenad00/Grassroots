import { DeleteUserDetails } from "../functionality/session-storage";
import { PageContent, PageElement } from "../components/multiuse-elements"
import { SignUserOut } from "../functionality/api-routes"
import styles from "../css/login.module.css";
import { useEffect, useState } from "react";

async function PerformSignOut(setResp){
    const resp = await SignUserOut();
    setResp(resp)
  }
export default function SignOut(){
  const [resp, setResp] = useState();
  const [errorMessage, setErrorMessage] = useState();
  useEffect(()=>{
    if (resp){
      const {error, data} = resp;
      if (error){
        setErrorMessage("looks like we can't sign you out right now - try again soon!");
        console.error(`[${error.status}] ${error.code}: ${error.message}`)
      } else {
        if(data.signout || data){
          DeleteUserDetails();
          window.location.href = '/';
        }
      }
    }
  }, [resp])

  return (
    <PageContent>
      <PageElement>
        <h2> Are you sure you wish to sign out? </h2>
        <div className={styles.signOutButtons}>
          <button onClick={()=>(window.location.href = "/")}>
            Go Back
          </button>
          <button className={styles.signout} onClick={()=>PerformSignOut(setResp)}>
            Yes, Sign Out
          </button>
        </div>
        <p>{errorMessage}</p>
      </PageElement>
    </PageContent>
  )
}