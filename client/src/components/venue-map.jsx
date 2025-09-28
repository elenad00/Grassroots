import BasicButton from './basic-button';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import styles from "../css/venues.module.css";
import '../css/leaflet.css';

const VenueMap = ({venues}) => {
  // replace the buggy marker icon with an icon that
  // better fits with the website's theme
  const markerIcon = L.icon({
    iconUrl: "../../public/images/marker-icon.png",
    // set the icon's size
    iconSize: [ 30, 32 ],
    // set the icon's anchor point to be the bottom of the point
    iconAnchor: [ 15, 32 ],
    popupAnchor:[0, 0]
  });

  // create the popup that shows above each of the marker points
  const MarkerPopup = ({venue}) => {
    return (
      <Popup>
        <div className={styles.markerPopup}>
          {/* Venue Name */}
          <h4>{venue.name}</h4>
          {/* Venue Address */}
          {venue.address.map((line, i) => {
            return(
              <p key={i}>
                {line}
              </p>
            )
          })}
          <BasicButton link={`/venues/${venue.username}`} title="Learn More"/>
        </div>
      </Popup>
    );
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      scrollWheelZoom={false}
      zoom={12}
    >
      {/* Set the map's attribution as well as importing the map itself */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* for each venue in venues, return the marker and its popup */}
      {venues.map((venue, i) => {
        return (
          <Marker
            icon={markerIcon}
            key={i}
            position={[
              venue.coordinates.latitude,
              venue.coordinates.longitude
            ]}
          >
            <MarkerPopup venue={venue} />
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default VenueMap;