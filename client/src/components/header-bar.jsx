import { PiMicrophoneStageBold } from "react-icons/pi";
import styles from "../css/header.module.css";
import { useState } from "react";
import { Username } from "../functionality/Authentication";

// set the core links that will be in the header
const coreHeaderLinks = [{
  link: "/", 
  title: "grassroots", 
  style: styles.headerTitle
},{ 
  link: "/venues",
  title: "grassroots venues",
  style: styles.headerItem
},{
  link: "/artists",
  title: "our artists",
  style: styles.headerItem
}];

const HeaderDropdown = () => {
  const username = Username();
  const dropdownLinkChoices = [
    [
      {link: `/users/${username}`, title: username, style: styles.headerUsername},
      {link: "/user-settings", title: "user settings", style: styles.headerItem},
      {link: "", title: "sign out", style: styles.headerItem},
    ], [
      {link: "/sign-in", title: "sign in", style: styles.headerItem}
    ]
  ];
  const dropdownLinks = username ? dropdownLinkChoices[ 0 ] : dropdownLinkChoices[ 1 ];
  return (
    <div>
      {dropdownLinks.map((item, i) => {
        return (
          <li key={i}>
            <a href={item.link} className={item.style}>
              {item.title}
            </a>
          </li>
        )
      })}
    </div>
  )
}
const HeaderBar = () => {
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdownList);
  const [header, setHeader] = useState(styles.headerBar);
  // change the style of the header bar and dropdown when the user scrolls
  const listenScrollEvent = () => {
    if(window.scrollY < 15){
      setHeader(styles.headerBar);
      setDropdownStyle(styles.dropdownList)
    } else {
      setHeader(styles.headerBarSolid);
      setDropdownStyle(styles.dropdownListSolid)
    }
  }
  // add an event listener to the window so that listen scroll event is picked up
  window.addEventListener('scroll', listenScrollEvent);

  return (
    <nav className={header}>
      <ul className={styles.headerContent}>
        <div className={styles.headerLinks}>
          {coreHeaderLinks.map((item, i) => {
            return (
              <li key={i}>
                <a href={item.link} className={item.style}>
                  {item.title}
                </a>
              </li>
            )
          })}
        </div>
        <div className={styles.dropdownHolder}>
           <li>
              <PiMicrophoneStageBold className={styles.micIcon} />
              <ul className={dropdownStyle}>
                <HeaderDropdown />
              </ul>
          </li>
        </div>
      </ul>
    </nav>
  );
};
export default HeaderBar;