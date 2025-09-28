import data from '../page-content/venues.json';
import DataContainer from '../components/data-container';
import styles from "../css/venues.module.css";
import VenueMap from "../components/venue-map";
import "../css/multiuse.css"

const Venues = () =>{
  const venues = data.items
  return (
    <div className="pageContent">
      <div className="header">
        <h1>{data.title}</h1>
        <h4>{data.tagline}</h4>
      </div>
      <div className={styles.mapHolder} >
        <VenueMap venues={venues}/>
      </div>
      <div className={styles.venuesContainer}>
        <h2 className={styles.venuesHeader}> All Venues </h2>
        <DataContainer dataGroup={venues} />
      </div>
    </div>
  );
};

export default Venues;