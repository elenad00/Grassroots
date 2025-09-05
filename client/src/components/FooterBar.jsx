import { FaInstagram } from 'react-icons/fa';
import styles from "../css/footer.module.css";

const FooterBar = () => {
  const submitEmailAddress = () => {
    // ! to do - add the user's email to a mailing list
  }

  return (
    <div className={styles.footerBar}>
      <div className={styles.footerLeft}>
        <div className={styles.footerBranding}>
          <h1> grassroots </h1>
          <p> Linking musicians with grassroots venues and promoters </p>
        </div>
        <div className={styles.footerLinks}>
          <a className={styles.instagramIcon} href="https://instagram.com/grassroots.ldn">
            <FaInstagram />
          </a>
          <p> | hello@grassroots-london.com</p>
        </div>
      </div>
      <div className={styles.footerRight}>
        <h4>Join The Community</h4>
        <form action={submitEmailAddress()} className={styles.emailContainer}>
          <input className={styles.enterEmail}/>
          <button className={styles.submitEmail} type="submit"><p>Sign Up</p></button>
        </form>
      </div>
    </div>
  )
}
export default FooterBar;