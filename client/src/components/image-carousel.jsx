import { ArtistCarousel, VenueCarousel } from './data-returns';
import styles from '../css/image-carousel.module.css';

export function ImageCarousel ({dataKey}) {
  const content = dataKey == "artists" ? ArtistCarousel : VenueCarousel;

  function ImageElement ({item}){
    const userLink = `/${dataKey}/${item.username}`;
    return(
      <a href={userLink} className={styles.carouselItem}>
        <img src={item.imagePath} />
        <h3>{item.name}</h3>
      </a>
    )
  }; 

  return (
    <div className={styles.carousel}>
      {content.map((item, i) => {
        return <ImageElement item={item} key={i} />;
      })}
    </div>
  );
};