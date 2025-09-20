import { FaInstagram } from "react-icons/fa";
import styles from "../css/containers.module.css";

// Creates and returns a data container element which is used to house an
// image, title, and description. Used for both artists and venues
const DataContainer = ({
  dataType,
  description, 
  image, 
  instagramHandle, 
  title,
  username
}) => {
  const instagramLink = `https://instagram.com/${instagramHandle}`;
  const userPage = `/${dataType}/${username}`;
  
  return (
      <div className={styles.dataContainer}>
        <a href={userPage} >
          <img src={image} className={styles.containerImage}></img>
        </a>
        <div className={styles.containerText}>
          <h2 className={styles.containerTitle}>{title}</h2>
          <p className={styles.containerDescription}>{description}</p>
          <a className={styles.instagramIcon} href={instagramLink}>
            <FaInstagram />
          </a>
        </div>
      </div>
  )
}

export default DataContainer