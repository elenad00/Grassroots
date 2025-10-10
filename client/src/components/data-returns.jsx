import artistData from "../page-content/artists.json";
import styles from "../css/image-carousel.module.css"
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

export function ImageCarousel ({data, dataType}) {
  return (
    <div className={styles.carousel}>
      { Object.values(data).forEach((item, i) => {
        const value = data[item]
        const userLink = `/${dataType}/${value.username}`;
        return(
          <a href={userLink} className={styles.carouselItem}>
            <img src={value.imagePath} />
            <h3>{value.name}</h3>
          </a>
        )
      })}
    </div>
  );
};

export const ArtistCards = GenerateCards(artistData, "artists");
export const ArtistCarousel = <ImageCarousel data={artistData} dataType='artists' />;
export const VenueCards = GenerateCards(venueData, "venues");
export const VenueCarousel = <ImageCarousel data={venueData} dataType='venues' />;