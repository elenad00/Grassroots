import styles from "../css/containers.module.css"

const HomepageSegment = ({ child, changeBackground, description, title }) => {
  return (
    <div className={
      // set the main styling
      // if the segment is at the top then set it's style
      // if it isn't but greenBG (green background) is set, then set that to be the style
      // otherwise, set the style to just be the main styling
      `${ styles.containerHolder }
       ${ changeBackground && styles.transitionBackground }` 
    }>
      <div className={ styles.containerText }>
        <h2>{title}</h2>
        <p>{description}</p>
        <div>
          {child}
        </div>
      </div>
    </div>
  );
};
export default HomepageSegment;