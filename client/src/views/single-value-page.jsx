import artistData from "../page-content/artists.json";
import { FaInstagram } from "react-icons/fa";
import { GenerateCarousel } from "../components/data-returns";
import { LoadingPage, PageContent, PageElement } from "../components/multiuse-elements";
import { SingleVenueMap } from "../components/venue-map";
import styles from "../css/single-value-page.module.css";
import { useEffect, useState } from "react";
import venueData from "../page-content/venues.json";

export default function SingleValuePage () {
  const [data, setData] = useState();
  const [pageType, setPageType] = useState()
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const [_, type, item] = window.location.pathname.split('/');
    setPageType(type)
    if(type == 'artists'){
      let artist = artistData[item]
      setData(artist)
    } else{
      let venue = venueData[item]
      setData(venue)
    }
    setIsLoading(false)
  }, [])

  function About(){
    return (
      <PageElement subclass={styles.about}>
        <img src={data.imagePath} />
        <PageElement title={{heading: `About ${data.name}`}}>
          <p>{data.bio}</p>
          {data.instagramHandle && 
            <a href={`https://instagram.com/${data.instagramHandle}`}><FaInstagram /></a>
          }
        </PageElement>
      </PageElement>
    )
  }

  function Shows(){
    let upcomingData;
    if (data.showList){
      upcomingData = <GenerateCarousel data={data.showList} />
    } else{
      upcomingData = <h4> Looks like there's no upcoming shows! </h4>
    }
    return(
      <PageElement subclass={styles.shows} title={{heading: "Our Upcoming Shows"}}>
        {upcomingData}
      </PageElement>
    )
  }

  function VenueLocation(){
    const venueData = {item: data};
    return(
      <PageElement subclass={styles.location} title={{"heading":"Find Us"}}>
        <PageElement subclass={styles.mapHolder}>
          <SingleVenueMap venue={venueData}/>
        </PageElement>
      </PageElement>
    )
  }

  if(isLoading){
    return <LoadingPage />
  }
  return(
    <PageContent page={{heading:data.name}}>
      <div className={styles.venuePage}>
        <About />
        <PageElement>
          <Shows />
          {pageType=='venues' && <VenueLocation />}
        </PageElement>
      </div>
    </PageContent>
  )
};