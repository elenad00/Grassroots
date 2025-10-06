import { Favourites } from "../components/user-page/favourites";
import { GetFullUserInformation } from "../functionality/api-routes"
import { NavButton, PageContent } from "../components/multiuse-elements";
import { Profile } from "../components/user-page/profile";
import { Settings } from "../components/user-page/settings"
import { useEffect, useState } from "react";
import "../css/user-page.module.css";

async function GetUserData(setResp){
  const resp = await GetFullUserInformation();
  setResp(resp)
}

export function UserPage(){
  const [resp, setResp] = useState(false);
  const [userData, setUserData] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [pageHeading, setPageHeading] = useState();
  const [pageContent, setPageContent] = useState();

  const pageRequested = (window.location.pathname).split('/').pop();
  
  // wait for user info to load before rendering page
  useEffect(()=>{
    function selectPageContent(){
      // specify the content that could render
      const content = {
        user: {
          content: <Profile userInfo={userData} />, 
          heading:`Hey there ${userData.username}`,
        },
        settings: {
          content: <Settings userInfo={userData} />, 
          heading:'User Settings',
        },
        favouriteartists: {
          content: <Favourites type="Artists" userInfo={userData} />, 
          heading: "Your Favourite Artists",
        },
        favouritevenues: {
          content: <Favourites type="Venues" userInfo={userData} />, 
          heading: "Your Favourite Venues",
        }
      }
      // get the last element of the current location's path
      

      // set the page content and heading
      setPageContent(content[pageRequested].content)
      setPageHeading({heading: content[pageRequested].heading})
    }
    // if user information has returned, then set the page content
    selectPageContent();
    setPageLoaded(true);
  }, [userData])

  useEffect(()=>{
    const {error, data} = resp;
    if (data) {
      setUserData(data);
    } else if (error){
      setDataError(error);
    }
  },[resp])

  useEffect(()=>{
    GetUserData(setResp)
  },[pageRequested])

  // while username is loading, just return a holder for the content
  if (pageLoaded){
    return(
      <PageContent page={pageHeading}>
        {pageContent}
      </PageContent>
    )
  } else if (dataError){
    console.error(`[${dataError.status}] ${dataError.code}: $[dataError.message]`)
    return(
      <PageContent>
        <PageElement>
          <h2> Hmm, looks like we can't get your user data </h2>
          <p> Are you sure you're logging in? </p>
          <NavButton content={{link:"/sign-in", title:"Sign In"}} />
        </PageElement>
      </PageContent>
    )
  }else{
    return <PageContent/>
  }
};
