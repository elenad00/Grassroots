import styles from "../css/core.module.css"

const Artist = () => {
  const artistName="Test Artist";
  return (
      <div className={styles.pageContent}>
        <h1>{artistName}</h1>
      </div>
    )
}

export default Artist