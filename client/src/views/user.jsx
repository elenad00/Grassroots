import { Favourites, Profile, Settings } from '../components/user-pages';
import { GetFullUserInformation } from '../functionality/api-routes';
import { NavButton, PageContent, PageElement, Loader } from "../components/multiuse-elements";
import { TouchJWT } from "../functionality/session-storage"
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "../css/user-page.module.css"

export default function UserPage (){
  const [pageHeading, setPageHeading] = useState();
  const [pageValues, setPageValues] = useState();
  const [userData, setUserData] = useState(false);
  const [resp, setResp] = useState(false);
  const requestedPage = useParams();

  function handleError(subheading, error){
    if(!error){
      error = {value: 404, code: "USER_NOT_LOGGED_IN", message: "User Not Logged In"}
    }
    setPageHeading({heading: "Oops!", subheading: subheading});
    setPageValues(
      <>
        <NavButton content={{link:'/sign-in', title:"Sign In"}} />
      </>
    )
    console.log(`${error.value} ${error.code}: ${error.message}`)
  }

  async function getUserData(){
    const r = await GetFullUserInformation();
    setResp(r)
  }

  function renderPage(){
    const content = {
      profile: {
        content: <Profile userData={userData} />, 
        heading: 'Welcome Back!'
      },
      settings: {
        content: <Settings userData={userData} />, 
        heading: 'User Settings'
      },
      "favourite-artists": {
        content: <Favourites favourites={userData.favArtists}/>, 
        heading: "Your Favourite Artists"
      },
      "favourite-venues": {
        content: <Favourites favourites={userData.favVenues}/>, 
        heading: "Your Favourite Venues"
      }
    }
    const getPage = requestedPage.subPage;
    if(!Object.keys(content).includes(getPage)){
      handleError("Looks like that page doesn't exist!", {value:401, code:"PAGE_UNKNOWN", message:`Page ${requestedPage} does not exist`})
    } else {
      const pageData = content[getPage];
      setPageHeading({heading: pageData.heading});
      setPageValues(pageData.content);
    }
  }

  useEffect(()=>{
    console.log(TouchJWT())
    if (!TouchJWT()){
      handleError("Looks like you're not logged in", false);
      return
    } else{
      getUserData(setResp);
    }
  },[requestedPage])
  
  useEffect(()=>{
    if(userData){
      renderPage()
    }
  },[userData])

  useEffect(() => {
    if(!resp) return;
    if(resp.error){
      handleError("We couldn't get your user data! Try again soon!", error);
      return
    } else{
      setUserData(resp.data);
    }
  }, [resp])

  return(
    <PageContent page={pageHeading}>
      <PageElement>
        {pageValues}
      </PageElement>
    </PageContent>
  )
}