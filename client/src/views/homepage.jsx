import {
  NavButton, 
  PageContent, 
  PageElement
} from "../components/multiuse-elements";
import { ImageCarousel } from "../components/image-carousel";
import data from "../page-content/homepage.json";

function Panel ({content}) {
  return (
    <>
      {content.items && (
        content.items.map((textBlock, i) => (
          <div key={i}>
            <h4>{textBlock.heading}</h4>
            <p>{textBlock.content}</p>
          </div>
        )))
      }
      {content.carouselKey && (
        <ImageCarousel dataKey={content.carouselKey} />
      )}
      {content.button && (
        <NavButton content={content.button} />
      )}
    </>
  )
}

export function Homepage (){
  return (
    <PageContent page={false}>
      {data.items.map((content, i) => {
        const panelTitle = {
          heading: content.title, 
          subheading: content.description
        }
        return (
          <PageElement title={panelTitle} key={i}>
            <Panel content={content} />
          </PageElement>
        )
      })}
    </PageContent>
  )
}
