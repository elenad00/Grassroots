import artistData from "../page-content/artists.json";
import venueData from "../page-content/venues.json";

function GenerateCards(data, dataName){
  let cards = [];
  for (let k in data){
    const v = data[k];
    cards.push({
      name: v.name,
      bio: v.bio,
      imagePath: v.imagePath,
      buttonContent: {
        link: `/${dataName}/${v.username}`, 
        title: "Learn More"
      }
    })
  };
  return cards;
}

function GenerateCarousel(data){
  let carouselItems = [];
  for (let k in data){
    let d = data[k]
    carouselItems.push({
      username: k,
      imagePath: d.imagePath,
      name: d.name
    })
  }
  return carouselItems
}

function GenerateMarkers(){
  let markers = [];
  for (let k in venueData){
    const v = venueData[k];
    markers.push({
      name: v.name,
      address: v.address,
      coords: v.coordinates,
      buttonContent: {
        link: `/venues/${v.username}`, 
        title: "Learn More"
      }
    })
  };
  return markers;
}

export const ArtistCards = GenerateCards(artistData, "artists");
export const ArtistCarousel = GenerateCarousel(artistData);
export const VenueCards = GenerateCards(venueData, "venues");
export const VenueCarousel = GenerateCarousel(venueData);
export const VenueMarkerData = GenerateMarkers();