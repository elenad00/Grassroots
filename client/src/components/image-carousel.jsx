import styles from '../css/image-carousel.module.css';

const ImageCarousel = ({ displayElements }) => {
  return (
    <div className={ styles.carousel }>
      { displayElements.map(( element, index ) => {
        return (
          <a 
            href={`users/${ element.username }`} 
            className={styles.carouselItem}
            key={index}
          >
            <img
              src={element.imagePath}
              className={styles.carouselImage}
            />
            <h3>{element.name}</h3>
          </a>
        );
      } ) }
    </div>
  );
};

export default ImageCarousel;