import { FaInstagram } from 'react-icons/fa';
import styles from "./css/footer.module.css";

export default function Footer(){
  return (
    <div className={styles.footer}>
      <h1> grassroots </h1>
      <p>
        Uniting grassroots venues, artists and fans across London
      </p>
      <div className={styles.contacts}>
        <a href='https://instagram.com/grassroots.ldn'>
          <FaInstagram />
        </a>
        <p> | hello@grassroots-london.com </p>
      </div>
    </div>
  )
}