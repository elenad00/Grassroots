import { FaInstagram } from 'react-icons/fa';
import styles from "../css/footer.module.css";

export function FooterBar () {
  const instagramLink = "https://instagram.com/grassroots.ldn";
  const instagramIcon = (
    <a className={styles.instaIcon} href={instagramLink}>
      <FaInstagram/>
    </a>
  )
  return (
    <div className={styles.footerBar}>
      <h1>grassroots</h1>
      <p>Uniting grassroots venues, artists and fans across London</p>
      <div className={styles.contactLine}>
        {instagramIcon}
        <p>| hello@grassroots-london.com</p>
      </div>
    </div>
  )
}
