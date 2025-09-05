import { Username } from "../functionality/Authentication";
import styles from "../css/sidenavigation.module.css"

// convert this to be a drop down from the header

const SideNav = () => {
  const username = Username();

  return (
    <div className={styles.sideNavContainer}>
      <div className={styles.sideNavContents}>
        <h4>{username}</h4>
        <a href="/signin" className={styles.sideNavSignIn}> Sign In </a>
        <div className = {styles.sideNavLink} >
          <a href="/usersettings">User Settings</a>
        </div>
        <div className = {styles.sideNavLink} >
          <a href="">Sign Out</a>
        </div>
      </div>
    </div>
  )
}

export default SideNav;