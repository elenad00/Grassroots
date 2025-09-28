import BasicButton from "../components/basic-button";
import styles from "../css/data-containers.module.css";

// Creates and returns a data container element which is used to house an
// image, title, and description. Used for both artists and venues
const DataContainer = ({
  dataGroup
}) => {
  return (
    <div className={styles.containerHolder}>
      {dataGroup.map((data, i) => {
        return (
          <div className={styles.dataContainer} key={i}>
            <img src={data.imagePath}></img>
            <h2>{data.name}</h2>
            <p>{data.bio}</p>
            <BasicButton 
              link={`/${data.dataType}/${data.username}`} 
              title="Learn More" 
            />
          </div>
        )
      })}
    </div>
  )
}

export default DataContainer