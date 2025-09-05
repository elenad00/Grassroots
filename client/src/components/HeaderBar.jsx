import {HiBars3} from "react-icons/hi2";

import {CheckAuth} from "../functionality/Authentication"

import styles from "../css/header.module.css";

// sort out the formatting

const HeaderBar = ({showSideNav}) => {
  const loggedIn = CheckAuth();
  const toggleSideNav = () => {
    showSideNav((prev) => !prev)
  }
  return (
    <div className={styles.headerBar}>
      <a href="/" className={styles.headerBrand}><h1>grassroots</h1></a>
      <div className={styles.headerLeft}>
        <div className={styles.headerLinks}>
          <a href="/venues">Grassroots Venues</a>
          <a href="/artists">Our Artists</a>
        </div>
      </div>
      <div className={styles.headerRight}>
        <HiBars3 
          onClick={toggleSideNav} 
          className={styles.hamburgerIcon}
        />
      </div>
    </div>
  )
}
export default HeaderBar