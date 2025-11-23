import { getSignInStatus } from '../page_functions/user_info'
import styles from "./css/header.module.css";

export default function Header (){
  let top_button;
  let username = getSignInStatus()
  if (username){
    top_button = {text: username, link:'/user/account'};
  } else{
    top_button = {text:'sign in!', link:'/sign-in'};
  }
  return (
    <nav className={styles.header}>
      <a className={styles.logo} href='/'> grassroots </a>
      <a href='/venues'> our venues </a>
      <a href='/artists'> our artists </a>
      <a href='/events'> our events </a>
      <a className={styles.topButton} href={top_button.link}>
        {top_button.username}
      </a>
    </nav>
  )
}