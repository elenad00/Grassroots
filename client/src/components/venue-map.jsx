import { NavButton } from './multiuse-elements';
import { Icon } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from "../css/venue-map.module.css";
import { VenueMarkerData } from './data-returns';
import "../css/leaflet.css";

const iconConfig = {
  // Set the icon link, size, anchor point, and where the popup anchors from
  iconUrl: "../../public/images/marker-icon.png",
  iconSize: [30, 32],
  iconAnchor: [15, 32],
  popupAnchor:[0, 0]
};

function VenueMarker ({venue}) {
  // Create the venue marker icon that points to a venue on the map
  return (
    <Marker icon={new Icon(iconConfig)} position={venue.coords}>
      <Popup className={styles.markerPopup}>
        <h4>{venue.name}</h4>
        {venue.address.map((line, i) => {
          return <p key={i}>{line}</p>
        })} 
        <NavButton content={venue.buttonContent}/>
      </Popup>
    </Marker>
  );
}
  
export function VenueMap(){
  // Returns a map containing markers to each of the affiliated Grassroots venues
  // The attribution for OpenStreetMaps
  const layerAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  // The link to get the map image
  const layerURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  return (
    <div className = {styles.mapHolder}>
      <MapContainer center={[51.52, -.1]} zoom={12} worldCopyJump={false}>
        {/* Set the map's attribution as well as importing the map itself */}
        <TileLayer attribution={layerAttribution} url={layerURL}/>
        {/* for each venue in venues, return the marker and its popup */}
        {VenueMarkerData.map((venue, i) => {
          return <VenueMarker venue={venue} key={i} />
        })}
      </MapContainer>
    </div>
  );
};
