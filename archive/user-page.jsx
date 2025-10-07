import { Favourites } from "../client/src/components/user-page/favourites";
import { GetFullUserInformation } from "../client/src/functionality/api-routes"
import { NavButton, PageContent, PageElement, PageLoading } from "../client/src/components/multiuse-elements";
import { Profile } from "../client/src/components/user-page/profile";
import { Settings } from "../client/src/components/user-page/settings"
import { useEffect, useState } from "react";
import "../css/user-page.module.css";
import { TouchJWT } from "../client/src/functionality/session-storage";

function HandleError () {
  return(
    <>
      <h2>Hmm, looks like we can't get your user data</h2>
      <p>Are you sure you're logged in? </p>
      <NavButton content={{link:"/sign-in", title:"Sign In"}} />
    </>
  )
}

export function UserPage(){
  const [resp, setResp] = useState(false);
  const [userData, setUserData] = useState(false);
  const [pageHeading, setPageHeading] = useState();
  const [pageContent, setPageContent] = useState();
  
  useEffect(()=>{
    async function getUserData(){
      
    }
    if(!TouchJWT()){
      HandleError(setPageHeading, setPageContent)
    } else{
      setPageContent(PageLoading)
      getUserData();
    }
  }, [])

  useEffect(() => {
    if(!resp){return}
    const {error, data} = resp;
    if (data) {
      setUserData(data);
    } else {
      setPageContent(<ErrorPage />)
    }
  }, [resp])
  
  useEffect(()=>{
    function selectPageContent(){
      // specify the content that could render
      const content = {
        user: {
          content: <Profile userInfo={userData} />, 
          heading: `Hey there ${userData.username}`
        },
        settings: {
          content: <Settings userInfo={userData} />, 
          heading: 'User Settings'
        },
        favouriteartists: {
          content: <Favourites type="Artists" userInfo={userData} />, 
          heading: "Your Favourite Artists"
        },
        favouritevenues: {
          content: <Favourites type="Venues" userInfo={userData} />, 
          heading: "Your Favourite Venues"
        }
      }
      // set the page content and heading
      setPageContent(content[requestedPage].content)
      setPageHeading({heading: content[requestedPage].heading})
    }
    // if user information has returned, then set the page content
    if(userData){
      selectPageContent();
      setPageLoading(false);
    }
  }, [userData])

  // while username is loading, just return a holder for the content
  return(
    <PageContent title={{heading: "User Profile", subheading: ""}}>
      <PageElement>
        {pageContent}
      </PageElement>
    </PageContent>
  )
}
