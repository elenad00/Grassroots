import styles from "../css/styles.module.css"

const Venue = () => {
  const venueName="Test Venue";
  return (
      <div className={styles.pageContent}>
        <h1>{venueName}</h1>
      </div>
    )
}

export default Venue