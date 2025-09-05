import styles from "../css/containers.module.css"
import data from '../pageContent/artists.json'

import {ArtistContainer} from "../components/ValueContainers"

const Artists = () => {
  const artists = (data.items)
  return (
    <>
      <h1> Our Artists </h1>
      <div className={styles.artistsContainer}>
        {artists.map((artist, index) => {
          return (
          <ArtistContainer 
            key={index}
            title={artist.name} 
            description={artist.bio}
            image={artist.imagePath}
          />)
        })}
      </div>
    </>
  )
}

export default Artists