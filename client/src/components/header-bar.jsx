import { GetUsername, TouchJWT } from "../functionality/session-storage";
import { PiMicrophoneStageBold } from "react-icons/pi";
import styles from "../css/header.module.css";
import { useEffect, useState } from "react";

export function HeaderBar () {
  const [username, setUsername] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [inBody, setInBody] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dropOpen, setDropOpen] = useState(false)
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownList);
  const [subStyle, setSubstyle] = useState("");
  
  window.addEventListener("scroll", scFunc);

  function scFunc(){
    if (this.scrollY >= 50 && !inBody){
      setInBody(true);
    } else if (this.scrollY < 50 && inBody ){
      setInBody(false)
    }
  }

  useEffect(()=>{
    inBody 
    ? setSubstyle(styles.userScrolled)
    : setSubstyle("")
  }, [inBody])

  useEffect(()=>{
    if (dropOpen){
      setDropdownStyle()
    } else {
      setDropdownStyle(styles.dropdownList)
    }
  },[dropOpen])

  useEffect(() => {
    const storedUsername = GetUsername();
    if(storedUsername){
      setLoggedIn(true)
      setUsername(storedUsername)
    } else if (TouchJWT()){
      setLoggedIn(true)
      setUsername('grassroots user')
    }
    setIsLoading(false);
  }, [])

  if(!isLoading){
    return(
      <nav className={`${styles.headerBar} ${subStyle}`}>
        <a href='/' className={styles.branding}>grassroots</a>
        <a className={styles.venues} href="/venues">our venues</a>
        <a className={styles.artists}  href="/artists">our artists</a>
        <button onClick={(current)=>setDropOpen(!current)} className={styles.micIcon}>
          <PiMicrophoneStageBold />
        </button>
        <div className={`${dropdownStyle} ${subStyle}`}>
          {loggedIn 
            ? (
              <div>
                <a href='/user/profile'>{username}</a>
                <a href='/user/settings'>User Settings</a>
                <a href='/sign-out'>Sign Out</a>
              </div>
            ):(
              <div>
                <a href='/sign-in'>Sign In</a>
              </div>
            )
          }
        </div>     
      </nav>
    )
  };
};