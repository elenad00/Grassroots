import data from "../page-content/page-headers.json";
import { Link } from "react-router"
import styles from "../css/multiuse.module.css";

export function NavButton ({content}){
  return (
    <Link to={content.link} className={styles.navButton}> 
      {content.title}
    </Link>
  )
};

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

export function PageElement({title, display, children}){
  let style = `${styles.pageElement}`
  style += display ? ` ${styles.pageElementRow}` : '';
  return (
    <div className={style}>
      {title && <PageHeader page={title} />}
      {children}
    </div>
  )
}
