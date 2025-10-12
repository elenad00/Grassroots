import { GetFullUserInformation } from '../functionality/api';
import { NavButton, PageContent, PageElement, Loader } from "../components/multiuse-elements";
import styles from "../css/user-pages.module.css";
import { TouchJWT } from "../functionality/session-storage"
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "../functionality/types";

export function Settings ({userData}) {
  const photo = userData.picture || false;
  function handleForm(){
    console.log("Form Submitted")
  }
  return (
    <div className={styles.settings}>
      <form onSubmit={handleForm}>
        <div className={styles.updateItems}>
          <div>
            <h3>Update Photo</h3>
            {photo 
              ? <img src={photo}></img>
              : <p> Looks like you don't have a photo yet! </p>
            }
            <button disabled={true}>Upload New Photo</button>
          </div>
          <div>
            <h3>Update Username</h3>
            <p>Current Username: {userData.username}</p>
            <input key="newUsername"/>
          </div>
          <div>
            <h3>Update Email</h3>
            <p> Current Email: {userData.email}</p>
            <input key="newEmail" />
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
      <p> You can't update your settings just yet - but here's what it will look like! </p>
    </div>
  )
};

/** Returns an a array of the user's favourite artists/venues
 * @param {string[]} favourites A username array of the user's favourite artists/venues
 * @param {string} dataType The type of favourites to get
 * @returns {Array} */
function MapFavourites(favourites, dataType){
  const data = (dataType == 'artists' ? artistData : venueData);
  const userFavourites = favourites.map((username) => {
    const item = data[username]
    return(
      <div className={styles.userFavourite}>
        <img src={item.imagePath}></img>
        <p>{item.name}</p>
      </div>
    )
  })
  return userFavourites
}

export function Favourites ({favourites}) {
  return(
    <PageElement display="row">
      <div className={favourites}>
        {MapFavourites(favourites)}
      </div>
      <p> We're still working on adding favourites! Check Back Soon</p>
    </PageElement>
  )
}

/** Returns the user's favourite artists/venues or message
 * @param {object} parameters The function's parameters
 * @param {string} parameters.dataType The type of favourites (artists/venues)
 * @param {string[]} parameters.userFavs An array of the user's favourite artists/venues
 * @returns {React.ReactElement} */
function FavouritesContainer({dataType, userFavs}){
  const lowerType = dataType.toLowerCase();
  return(
    <div className={styles.favContainer}>
      <h3>Your Favourite {dataType}</h3>
      {userFavs != null ? (
        <>
          { MapFavourites(userFavs.slice(0, 3), lowerType) }
          <NavButton content={{link:`/user/favourite${dataType}`, title: "View All"}} />
        </>
      ):(
        <>
          <p>Looks like you don't have any favourite {lowerType} yet</p>
          <NavButton content={{link:`/${lowerType}`, title: "Go Find Some"}} />
        </>
      )}
    </div>
  )
}
  
/** Render the user's profile
 * @param {Object} parameters 
 * @param {(FullUserData | false)} parameters.userData The user's data
 * @returns {React.ReactElement} The user's profile */
export function Profile ({userData}){
  const {username, email, picture, forename, surname, favArtists, favVenues} = userData;
  if(userData){
    return(
      <PageElement display='row' subclass={styles.profileContainer}>
        <PageElement subclass={styles.profile}>
          {picture ? <img src={picture}></img> : <div /> }
          {username ? <h2>{username}</h2> : <h4> Username Not Set!</h4> }
          <p>{forename} {surname}</p>
          <p>{email}</p>
          <NavButton content={{link:"/user/settings", title:"Edit Profile"}} />
        </PageElement>
        <PageElement subclass={styles.favourites}>
          <FavouritesContainer dataType="Artists" userFavs={favArtists}/>
          <FavouritesContainer dataType="Venues" userFavs={favVenues}/>
        </PageElement>
      </PageElement>
    )
  } else {
    return Loader
  }
};

export default function UserPage (){
  const [pageHeading, setPageHeading] = useState();
  const [pageValues, setPageValues] = useState();
  const requestedPage = useParams();
  /** Handles any errors that have occurred when attempting to render the page
   * @param {string} subheading 
   * @param {APIError | false} error */
  function handleError(subheading, error){
    if(!error){
      error = {status: 404, code: "USER_NOT_LOGGED_IN", message: "User Not Logged In"}
    }
    setPageHeading({heading: "Oops!", subheading: subheading});
    setPageValues(<NavButton content={{link:'/sign-in', title:"Sign In"}} />)
    console.log(`${error.status} ${error.code}: ${error.message}`)
  }
  /** Get the user's data and then render the page they have requested, otherwise render an error message */
  async function renderPage(){
    const resp = await GetFullUserInformation();
    const {error, data} = resp;
    if(error){
      handleError("We couldn't get your user data! Try again soon!", error);
      return
    }
    const content = {
      profile: {
        content: <Profile userData={data} />, 
        heading: 'Welcome Back!'
      },
      settings: {
        content: <Settings userData={data} />, 
        heading: 'User Settings'
      },
      "favourite-artists": {
        content: <Favourites favourites={data.favArtists}/>, 
        heading: "Your Favourite Artists"
      },
      "favourite-venues": {
        content: <Favourites favourites={data.favVenues}/>, 
        heading: "Your Favourite Venues"
      }
    }
    const getPage = requestedPage.subPage;
    if(!Object.keys(content).includes(getPage)){
      handleError(
        "Looks like that page doesn't exist!", 
        {value: 401, code: "PAGE_UNKNOWN", message: `Page ${requestedPage} does not exist`})
    } else {
      const pageData = content[getPage];
      setPageHeading({heading: pageData.heading});
      setPageValues(pageData.content);
    }
  }
  // When the parameters have been retrieved, go about rendering the page
  // this allows the page to rerender if they go from, say, profile to settings
  useEffect(()=>{
    TouchJWT()
    ? renderPage()
    : handleError("Looks like you're not logged in", false)
  },[requestedPage])

  return(
    <PageContent page={pageHeading}>
      <PageElement>
        {pageValues}
      </PageElement>
    </PageContent>
  )
}