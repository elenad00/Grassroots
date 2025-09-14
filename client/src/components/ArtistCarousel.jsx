import data from '../pageContent/artists.json'
import styles from '../css/artistCarousel.module.css'

const ArtistCarousel = () => {
  const artists = (data.items);
  return (
    <div className={styles.carousel}>
      {artists.map((artist, index) => {
        return (
          <div className={styles.artistItem} key={index}>
            <img 
              src={artist.imagePath} 
              className={styles.artistImage}
            />
            <h3>{artist.name}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default ArtistCarousel