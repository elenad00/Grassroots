// .userPageNav {
//   display: grid;
//   gap: 1em;
//   height: inherit;
//   max-width: fit-content;
// }
// .userPageNav button{
//   background-color: #98af88;
//   border-radius: 1em;
//   border: none;
//   display: grid;
//   font-family: "Lato";
//   min-width: 10em;
//   max-width: fit-content;
//   padding: .5em;
//   text-align: center;
// }
// .userPageNav button:hover,
// .userPageNav button:disabled {
//   background-color: #98af8849;
//   color: black;
// }


import Favourites from "../components/user-page/favourites";
import { getUserDetails } from "../../../archive/Authentication";
import { PageContent, PageElement } from "../components/multiuse-elements";
import Profile from "../components/user-page/profile";
import Settings from "../components/user-page/settings";
import styles from "../css/user-page.module.css";
import { useEffect, useState } from "react";

function UserSidebar({userInfo, currentPage, setCurrentPage}){
  const subPages = [
    {
      title: "Your Profile", 
      page: <Profile userData={userInfo} />
    },{
      title: "User Settings", 
      page: <Settings userData={userInfo} />
    },{
      title: "Favourite Artists", 
      page: <Favourites userData={userInfo} data="Artists" />
    },{
      title: "Favourite Venues", 
      page: <Favourites userData={userInfo} data="Venues" />
    },
  ]
  return (
    <nav className={styles.userPageNav}>
      {subPages.map((page, i) => {
        const disabled = page == currentPage ? true : false;
        return (
          <button onClick={()=>setCurrentPage(page)} disabled={disabled} key={i}>
            {page.title}
          </button>
        )
      })}
    </nav>
  )
}

function UserPage(){
  const [userInfo, setUserInfo] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(false);
  const [pageHeading, setPageHeading] = useState()
  
  getUserDetails(setUserInfo);
  
  // wait for user info to load before rendering page
  useEffect(()=>{
    if (userInfo) {
      setPageHeading({
        heading: `Hey There ${userInfo.username}!`
      })
      setCurrentPage({title: "Your Profile", page: <Profile userData={userInfo}/>})
      setPageLoaded(true);
    }
  }, [userInfo])

  // while username is loading, just return a holder for the content
  if (pageLoaded) {
    return (
      <PageContent page={pageHeading}>
        <PageElement display="row">
          {/* <UserSidebar 
            userInfo={userInfo}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          /> */}
          {currentPage.page}
        </PageElement>
      </PageContent>
    )
  } else{
    return(<PageContent/>)
  }
};

export default UserPage;