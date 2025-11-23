import artists from "../content/artists.json";
import data from "../content/homepage.json";
import venues from "../content/venues.json";
import styles from "./css/homepage.module.css";

function ImageCarousel({data_type}){
  const data_source = data_type == 'artists' ? artists : venues;
  return (
    <div className={styles.carousel}>
      {Object.entries(data_source).map(([k, v], i) => (
        <a href={`/${data_type}/${k}`} className={styles.item} key={i}>
          <img src={v.imagePath} />
          <h3>{v.name}</h3>
        </a>
      ))}
    </div>
  );
}
function CreateButton({content}){
  return (
    <button className={styles.button}>
      <Link to={content.link}>
        <p>{content.title}</p>
      </Link>
    </button>
  )
}
function CreateAboutContent({content}){
  return(
    <div className={styles.missionBlock}>
      {
        Object.entries(content).map(([k,v], i) => 
          <div key={i}>
            <h3>{`For ${k}`}</h3>
            <p>{v}</p>
          </div>
        )
      }
    </div>
  )
}
function HomepageBlock({block_content}){
  const {heading, subheading, carousel, content, button} = block_content;
  return(
    <div className={styles.container}>
      <h1> {heading} </h1>
      <h2> {subheading} </h2>
      {carousel ?? 
        <ImageCarousel data_source={carousel}/>
      }
      {content ?? 
        <CreateAboutContent content={content}/>
      }
      <CreateButton content={button} />
    </div>
  )
}

export default function Homepage(){
  return(
    <>
      {Object.entries(data).map(([k, v], i) => (
        <HomepageBlock block_content={v} key={i}/>
      ))}
    </>
  )
}