import artistData from "../page-content/artists.json";
import data from "../page-content/page-headers.json";
import { Link } from "react-router";
import { ScaleLoader } from "react-spinners";
import styles from "../css/multiuse.module.css";
import venueData from "../page-content/venues.json";

// Nav Button
export function NavButton ({content}){
  return (
    <button  className={styles.navButton}>
      <Link to={content.link}> 
        {content.title}
      </Link>
    </button>
  )
};

// Page Elements
function PageHeader({page}){
  let headingItems = false;
  
  typeof page == "string" 
    ? headingItems = data[page]
    : headingItems = page
  
  return (
    <div className={styles.header}>
      <h1>{headingItems.heading}</h1>
      <h5>{headingItems.subheading}</h5>
    </div>
  )
}
export function PageContent({page, children}){
  return (
    <div className={styles.pageContent}>
      {page && <PageHeader page={page} />}
      {children}
    </div>
  )
}
export function PageElement({title, display, children, subclass}){
  let style = `${styles.pageElement}`
  style += display ? ` ${styles.pageElementRow}` : '';
  style+= subclass ? ` ${subclass}` : ''
  return (
    <div className={style}>
      {title && <PageHeader page={title} />}
      {children}
    </div>
  )
}

// Generate All Data Cards
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
export const ArtistCards = GenerateCards(artistData, "artists");
export const VenueCards = GenerateCards(venueData, "venues");

// Generate Image Carousel
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
export const ArtistCarousel = <ImageCarousel data={artistData} dataType='artists' />;
export const VenueCarousel = <ImageCarousel data={venueData} dataType='venues' />;

// Loaders
export const Loader = (
  <ScaleLoader 
    width={5} 
    height={80} 
    color="#000000ff" 
    barCount={10}
  />
)
export function LoadingPage(){
  return(
    <PageElement>
      <PageContent>
        {Loader}
      </PageContent>
    </PageElement>
  )
}