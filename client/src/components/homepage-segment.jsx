import styles from "../css/homepage.module.css"

const HomepageSegment = ({ child, changeBackground, description, title }) => {
  return (
    <div className={
      // set the main styling
      // if the segment is set to have a transitional background then set that as well,
      // otherwise, just set the style to just be the main styling
      `${ styles.containerHolder }
       ${ changeBackground && styles.transitionBackground }` 
    }>
      <div className={styles.containerText}>
        <h1>{title}</h1>
        <p>{description}</p>
        <div>
          {child}
        </div>
      </div>
    </div>
  );
};
export default HomepageSegment;