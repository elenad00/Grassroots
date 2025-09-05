import {ValueContainer} from "../components/ValueContainers"
import styles from "../css/styles.module.css"

const Home = () => {
  return (
    <div className={styles.homePage}>
      <ValueContainer title="Test" description="this is a test" image=""/>
    </div>
  )
}

export default Home;