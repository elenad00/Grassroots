import {HiBars3} from "react-icons/hi2";

import {CheckAuth} from "../functionality/Authentication"
import styles from "../css/styles.module.css";

const HeaderBar = ({showSideNav}) => {
  const loggedIn = CheckAuth();
  const toggleSideNav = () => {
    showSideNav((prev) => !prev)
  }
  return (
    <div className={styles.headerBar}>
      <a href="/" className={styles.headerBrand}><h1>grassroots</h1></a>
      <div className={styles.headerRight}>
        {!loggedIn && (
          <a href="/signin" className={styles.joinButton}>Join Us</a>
        )}
        <HiBars3 onClick={toggleSideNav} className={styles.hamburgerIcon}/>
      </div>
    </div>
  )
}
export default HeaderBar