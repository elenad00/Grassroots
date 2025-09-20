import { FaInstagram } from 'react-icons/fa';
import styles from "../css/footer.module.css";

const FooterBar = () => {
  return (
    <div className={styles.footerBar}>
      <h1> grassroots </h1>
      <p> Uniting grassroots venues, artists and fans across London </p>
      <div className={styles.footerLinks}>
        <a className={styles.instagramIcon} href="https://instagram.com/grassroots.ldn">
          <FaInstagram />
        </a>
        <p> | </p>
        <p> hello@grassroots-london.com </p>
      </div>
    </div>
  )
}
export default FooterBar;