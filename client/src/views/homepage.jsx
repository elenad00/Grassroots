import { NavButton, PageContent, PageElement } from "../components/multiuse-elements";
// import { ImageCarousel } from "../components/image-carousel";
import { ArtistCarousel, VenueCarousel } from "../components/data-returns";
import data from "../page-content/homepage.json";

export default function Homepage (){
  const carousels = [VenueCarousel, ArtistCarousel]
  return(
    <PageContent>
      <PageElement title={data.welcome.header}>
        <NavButton content={data.welcome.button} />
      </PageElement>
      {[data.venues, data.artists].map((data, i) => {
        return (
          <PageElement title={data.header}>
            { carousels[i] }
            <NavButton content={data.button} />
          </PageElement>
        )
      })}
      <PageElement title={data.mission.header}>
        {['venues','artists','fans'].map((block) => {
          const data = data.mission[block]
          <h3>{data.heading}</h3>
          <p>{data.content}</p>
        })}
      </PageElement>
    </PageContent>
  )
  // return (
  //   <PageContent page={false}>
  //     <PageElement title={}
  //     {data.items.map((content, i) => {
  //       const panelTitle = {
  //         heading: content.title, 
  //         subheading: content.description
  //       }
  //       return (
  //         <PageElement title={panelTitle} key={i}>
  //           <Panel content={content} />
  //         </PageElement>
  //       )
  //     })}
  //   </PageContent>
  // )
}
