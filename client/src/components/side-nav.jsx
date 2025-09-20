import styles from "../css/sidenavigation.module.css"
import { Username, CheckAuth } from "../functionality/authentication";


const UserSignedIn = () => {
  return (
    <div className={styles.sideNavContents}>
      <h4>{Username()}</h4>
      <a href="/usersettings" className={styles.sideNavLink}>User Settings</a>
      <a href="" className = {styles.sideNavLink} >Sign Out</a>
    </div>
  )
};

const UserNew = () => {
  return (
    <div className={styles.sideNavContents}>
      <a href="/signin" className={styles.sideNavSignIn}> Sign In </a>
    </div>
  )
};

const SideNav = () => {
  return (
    <div className={styles.sideNavContainer}>
      {CheckAuth ? < UserSignedIn/> : < UserNew/>}
    </div>
  )
}

export default SideNav;