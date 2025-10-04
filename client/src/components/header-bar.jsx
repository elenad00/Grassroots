import { getUsername } from "../functionality/authentication";
import headerLinks from "../page-content/header-links.json"
import { PiMicrophoneStageBold } from "react-icons/pi";
import styles from "../css/header.module.css";
import { useEffect, useState } from "react";

export function HeaderBar () {
  const [inBody, setInBody] = useState(false);
  const [subStyle, setSubstyle] = useState("")
  const username = getUsername();
  const dropdownLinks = username ? headerLinks.signedIn : headerLinks.newUser;
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

  const LinkBlock = ({linkObj, username}) => {
    const usernameItem = {
      link:`/users/${username}`, 
      title: username
    };
    return (
      linkObj.map((obj, i) => {
        obj = obj.title=="username" ? usernameItem : obj;
        return (
          <a href={obj.link} key={i}> {obj.title} </a>
        )
      })
    )
  }
  
  return (
    <nav className={`${styles.headerBar} ${subStyle}`}>
      <LinkBlock linkObj={headerLinks.core} />
      <PiMicrophoneStageBold className={styles.micIcon} />
      <div className={`${styles.dropdownList} ${subStyle}`}>
        <LinkBlock linkObj={dropdownLinks}  username={username}/>
      </div> 
    </nav>
  );
};