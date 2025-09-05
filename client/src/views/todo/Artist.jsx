import styles from "../css/styles.module.css"

const Artist = () => {
  const artistName="Test Artist";
  return (
      <div className={styles.pageContent}>
        <h1>{artistName}</h1>
      </div>
    )
}

export default Artist