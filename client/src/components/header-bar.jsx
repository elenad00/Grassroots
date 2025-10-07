import { GetUsername, TouchJWT } from "../functionality/session-storage";
import headerLinks from "../page-content/header-links.json";
import { PiMicrophoneStageBold } from "react-icons/pi";
import styles from "../css/header.module.css";
import { useEffect, useState } from "react";

export function HeaderBar () {
  const [username, setUsername] = useState()
  const [inBody, setInBody] = useState(false);
  const [subStyle, setSubstyle] = useState("")
  
  const dropdownLinks = username ? headerLinks.signedIn : headerLinks.newUser;
  const usernameItem = {
    link: '/user/profile', title: username
  };
  
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
    const storedUsername = GetUsername();
    if(storedUsername){
      setUsername(storedUsername)
      return
    } else if (TouchJWT){
      setUsername("grassroots user")
    } else{
      setUsername(false)
    }
    
  }, [])

  const CoreLinks = (
    <div className={styles.coreLinks}>
      {headerLinks.core.map((item, i) => {
        return <a href={item.link} key={i}> {item.title} </a>
      })}
    </div>
  )
  const DropdownBlock = (
    <div className={`${styles.dropdownList} ${subStyle}`}>
      {dropdownLinks.map((item, i) => {
        item = item.title=="username"  ? usernameItem : item
        return <a href={item.link} key={i}> {item.title}</a>
      })}
    </div> 
  )

  return (
    <nav className={`${styles.headerBar} ${subStyle}`}>
      {CoreLinks}
      <PiMicrophoneStageBold className={styles.micIcon} />
      {DropdownBlock}      
    </nav>
  );
};