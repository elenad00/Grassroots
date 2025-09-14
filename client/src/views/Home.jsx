import {ValueContainer} from "../components/ValueContainers"
import styles from "../css/homepage.module.css"
import containers from '../pageContent/homepage.json'
import ArtistCarousel from "../components/ArtistCarousel"

const Home = () => {
  return (
    <div className={styles.homePage}>
      <ValueContainer 
        greenBG={true}
        topContainer={true}
        title={containers[0].title}
        description={containers[0].description}
        child={
          <a href="/signin"> 
            <button className={styles.signInButton}>
              Join The Community
            </button>
          </a>
        }
      />
      <ValueContainer 
        greenBG={false}
        title={containers[1].title}
        description={containers[1].description}
        child={
          <div>
            <a href="/venues"> 
              <button className={styles.signInButton}>
                Learn More
              </button>
            </a>
          </div>
        }
      />
      <ValueContainer 
        greenBG={true}
        title={containers[2].title}
        description={containers[2].description}
        child={
          <div>
            <ArtistCarousel />
            <a href="/artists"> 
              <button className={styles.signInButton}>
                Learn More
              </button>
            </a>
          </div>
        }
      />
      <ValueContainer 
        greenBG={false}
        title={containers[3].title}
        description={containers[3].description}
        child={
          <div>
            {containers[3].items.map(
              (textBlock, index) => (
                <div key={index}>
                  <h3>{textBlock.heading}</h3>
                  <p>{textBlock.content}</p>
                </div>
              )
            )}
          </div>
        }
      />
    </div>
  )
}

export default Home;