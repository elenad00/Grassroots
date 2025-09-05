import styles from "../css/containers.module.css"
import { FaInstagram } from "react-icons/fa"

const ValueContainer = ({title, description, image}) => {
  return (
    <div className={styles.containerHolder}>
      <img src={image} className={styles.imageHolder}></img>
      <div className={styles.containerText}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}
const ArtistContainer = ({
  title, 
  description, 
  image, 
  instagramHandle, 
  username
}) => {
  const userPage = `/artists/${username}`
  const instagramLink = `https://instagram.com/${instagramHandle}`

  return (
    <a href={userPage} className={styles.artistContainer}>
      <div>
        <img src={image} className={styles.imageHolder}></img>
        <div className={styles.containerText}>
          <h2>{title}</h2>
          <p>{description}</p>
          <a className={styles.instagramIcon} href={instagramLink}>
            <FaInstagram />
          </a>
        </div>
      </div>
    </a>
  )
}


export {ValueContainer, ArtistContainer};