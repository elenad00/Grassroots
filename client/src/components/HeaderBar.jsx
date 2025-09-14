import { PiMicrophoneStageBold } from "react-icons/pi";

import { Username } from "../functionality/Authentication";
import { useState, useEffect } from "react";

import styles from "../css/header.module.css";

const HeaderBar = () => {
  const [header, setHeader] = useState(styles.headerBar);
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownClass);
  const username = Username();

  const listenScrollEvent = () => {
    window.scrollY < 15 
    ? (setHeader(styles.headerBar), setDropdownStyle(styles.dropdownClass))
    : (setHeader(styles.headerBarScroll), setDropdownStyle(styles.dropdownClassScroll))
  } 

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
  });

  return (
    <nav className={header}>
      <ul className={styles.headerContent}>
        <div className={styles.headerLinks}>
          <li><a href="/"><h1>grassroots</h1></a></li>
          <li><a href="/venues">grassroots venues</a></li>
          <li><a href="/artists">our artists</a></li>
        </div>
        <div className={styles.dropdownHolder}>
          <li>
            <PiMicrophoneStageBold className={ styles.micIcon } />
            <ul className={dropdownStyle}>
              {username ? (
                <div>
                  <li>
                    <a href={ `/users/${ username }` }>
                      <h4>{ username }</h4>
                    </a>
                  </li>
                  <li>
                    <a href="/user-settings">User Settings</a>
                  </li>
                  <li>
                    <a href="">Sign Out</a>
                  </li>
                </div>
              ) : (
                <li>
                  <a 
                    href="/sign-in" 
                    className={ styles.sideNavSignIn }
                  >
                    Sign In
                  </a>
                </li>
              )}
            </ul>
          </li>
        </div>
      </ul>
    </nav>
  );
};
export default HeaderBar;