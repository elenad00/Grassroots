import { PiMicrophoneStageBold } from "react-icons/pi";
import styles from "../css/header.module.css";
import { useEffect, useState } from "react";
import { Username } from "../functionality/authentication";

const HeaderBar = () => {
  const [ dropdownStyle, setDropdownStyle ] = useState( styles.dropdownList );
  const [ header, setHeader ] = useState( styles.headerBar );
  const username = Username();
  
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

  // set the links that will be in the drop down; either for a logged in user or new user
  const dropdownLinkChoices = [[
    {
      link: `/users/${ username }`,
      title: { username },
      style: styles.headerUsername
    },{
      link: "/user-settings",
      title: "user settings",
      style: styles.headerItem
    },{
      link: "",
      title: "sign out", 
      style: styles.headerItem
    },
  ], [
    {
      link: "/sign-in", 
      title: "sign in", 
      style: styles.headerItem
    },
  ]];

  // the dropdown segment that comes from hovering over the microphone icon
  const DropdownSegment = ({dropdownLinks}) => {
    return (
      <li>
        <PiMicrophoneStageBold className={styles.micIcon} />
        <ul className={dropdownStyle}>
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
        </ul>
      </li>
    )
  };

  // decide which of the dropdown links to use
  const dropdownLinks = username ? dropdownLinkChoices[ 0 ] : dropdownLinkChoices[ 1 ];

  // change the style of the header bar and dropdown when the user scrolls
  const listenScrollEvent = () => {
    window.scrollY < 15
      ? ( setHeader( styles.headerBar ), setDropdownStyle( styles.dropdownList ) )
      : ( setHeader( styles.headerBarSolid ), setDropdownStyle( styles.dropdownListSolid ) );
  };
  
  // add an event listener to the window so that listen scroll event is picked up
  useEffect( () => {
    window.addEventListener( 'scroll', listenScrollEvent );
  } );
  
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
          <DropdownSegment dropdownLinks={dropdownLinks} />
        </div>
      </ul>
    </nav>
  );
};
export default HeaderBar;