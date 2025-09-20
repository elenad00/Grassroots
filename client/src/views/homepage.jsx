import Carousel from "../components/image-carousel"
import HomepageSegment from "../components/homepage-segment"
import HomepageData from '../page-content/homepage'
import styles from "../css/homepage.module.css"

const Homepage = () => {
  const MissionContainer = ({panel}) => {
    return (
      <div className={styles.missionContainer}>
        {panel.items.map((textBlock, index) => (
          <div key={index} className={styles.missionElement}>
            <h3>{textBlock.heading}</h3>
            <p>{textBlock.content}</p>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      {HomepageData.map((panel, i) => {
        return (
          <HomepageSegment 
            child={ 
              <div>
                {panel.carouselItems && <Carousel displayElements={panel.carouselItems} />}
                {panel.button && panel.button}
                {panel.items && <MissionContainer panel={panel} />}
              </div>
            }
            description={panel.description}
            changeBackground={panel.changeBackground}
            key={i}
            title={panel.title}
          />
        )
      })}
    </div>
  )
}

export default Homepage;