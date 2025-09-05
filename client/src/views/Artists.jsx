import styles from "../css/containers.module.css"
import data from '../pageContent/artists.json'

import {ArtistContainer} from "../components/ValueContainers"

const Artists = () => {
  // get the data from json file
  const pageTitle = data.title
  const pageDescription = data.description
  const artists = (data.items)
  return (
    <>
      {/* Page Header */}
      <div className={styles.header}>
        <h1>{pageTitle}</h1>
        <h3>{pageDescription}</h3>
      </div>
      {/* Item Container */}
      <div className={styles.artistsContainer}>
        {artists.map((artist, index) => {
          return (
          <ArtistContainer 
            key={index}
            title={artist.name} 
            description={artist.bio}
            image={artist.imagePath}
            instagramHandle={artist.instagramHandle}
            username={artist.username}
          />)
        })}
      </div>
    </>
  )
}

export default Artists