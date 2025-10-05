import { Favourites } from "../components/user-page/favourites";
import { getUserDetails } from "../functionality/authentication";
import { PageContent } from "../components/multiuse-elements";
import { Profile } from "../components/user-page/profile";
import { Settings } from "../components/user-page/settings"
import { useEffect, useState } from "react";
import "../css/user-page.module.css";

export function UserPage(){
  const [userInfo, setUserInfo] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageHeading, setPageHeading] = useState();
  const [pageContent, setPageContent] = useState();

  getUserDetails(setUserInfo);
  
  // wait for user info to load before rendering page
  useEffect(()=>{
    function selectPageContent(){
      // specify the content that could render
      const content = {
        user: {
          content: <Profile userInfo={userInfo} />, 
          heading:`Hey there ${userInfo.username}`,
        },
        settings: {
          content: <Settings userInfo={userInfo} />, 
          heading:'User Settings',
        },
        favouriteartists: {
          content: <Favourites type="Artists" userInfo={userInfo} />, 
          heading: "Your Favourite Artists",
        },
        favouritevenues: {
          content: <Favourites type="Venues" userInfo={userInfo} />, 
          heading: "Your Favourite Venues",
        }
      }
      // get the last element of the current location's path
      const pageRequested = (window.location.pathname).split('/').pop();

      // set the page content and heading
      setPageContent(content[pageRequested].content)
      setPageHeading({heading: content[pageRequested].heading})
    }
    // if user information has returned, then set the page content
    if (userInfo) {
      selectPageContent()
      setPageLoaded(true);
    }
  }, [userInfo])

  // while username is loading, just return a holder for the content
  if (pageLoaded){
    return(
      <PageContent page={pageHeading}>
        {pageContent}
      </PageContent>
    )
  } else{
    return <PageContent/>
  }
};
