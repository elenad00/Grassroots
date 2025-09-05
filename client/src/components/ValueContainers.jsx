import styles from "../css/containers.module.css"

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
const ArtistContainer = ({title, description, image}) => {
  return (
    <div className={styles.artistContainer}>
      <img src={image} className={styles.imageHolder}></img>
      <div className={styles.containerText}>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  )
}


export {ValueContainer, ArtistContainer};