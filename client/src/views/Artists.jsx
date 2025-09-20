import DataContainer from "../components/data-container";
import data from '../page-content/artists.json';
import styles from "../css/containers.module.css";

const Artists = () => {
  // get the data from json file
  const pageTitle = data.title;
  const pageDescription = data.description;
  const artists = data.items;

  return (
    <>
      {/* Page Header */}
      <div className={styles.header}>
        <h1>{pageTitle}</h1>
        <h4>{pageDescription}</h4>
      </div>
      {/* Item Container */}
      <div className={styles.dataContainers}>
        { artists.map((artist, index) => {
          return (
            <DataContainer 
              dataType="users"
              description={artist.bio}
              image={artist.imagePath}
              instagramHandle={artist.instagramHandle}
              key={index}
              title={artist.name}
              username={artist.username}
            />
          )
        })}
      </div>
    </>
  )
}

export default Artists