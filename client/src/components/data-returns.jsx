import artistData from "../page-content/artists.json";
import venueData from "../page-content/venues.json";

function GenerateCards(data, dataName){
  let cards = [];
  for (let k in data){
    const d = data[k];
    cards.push({
      name: d.name,
      bio: d.bio,
      imagePath: d.imagePath,
      buttonContent: {
        link: `/${dataName}/${k}`, 
        title: "Learn More"
      }
    })
  };
  return cards;
}

export function GenerateCarousel(data){
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

export const ArtistCards = GenerateCards(artistData, "artists");
export const ArtistCarousel = GenerateCarousel(artistData);
export const VenueCards = GenerateCards(venueData, "venues");
export const VenueCarousel = GenerateCarousel(venueData);