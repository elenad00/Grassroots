import { NavButton, PageElement, PageLoading } from "./multiuse-elements";
import styles from "../css/user-page.module.css";

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

function MapFavourites(favourites){
  return favourites.map((favourite) => {
    <>
      <img src={favourite.picture}></img>
      <p>{favourite.name}</p>
    </>
  })
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

export function Profile ({userData}){
  function FavouriteContainer({type}){
    const lowerType = type.toLowerCase();
    const favourites = userData[`fav${type}`];

    const buttonContent = (
      favourites 
      ? {link:`/user/favourite${lowerType}`, text: "View All"}
      : {link:`/${lowerType}`, title: "Go Find Some"}
    )
    const content = (
      favourites
      ? MapFavourites(favourites.slice(2))
      : <p>Looks like you don't have any favourite {lowerType} yet</p>
    );

    return(
      <div className={styles.favContainer}>
        <h3> Your Favourite {type} </h3>
        <>
          {content}
        </>
        <NavButton content={buttonContent} />
      </div>
    )
  }
  const {username, email, picture, forename, surname} = userData;

  if(userData){
    return(
      <div className={styles.profileContainer}>
        <div className={styles.profile}>
          {picture
            ? <img src={picture}></img>
            : <div />
          }
          {username
            ? <h2>{username}</h2>
            : <h4> Username Not Set!</h4>
          }
          <p>{forename} {surname}</p>
          <p>{email}</p>
          <NavButton content={{link:"/user/settings", title:"Edit Profile"}} />
        </div>
        <div className={styles.favourites}>
          <FavouriteContainer type="Artists"/>
          <FavouriteContainer type="Venues"/>
        </div>
      </div>
    )
  } else {
    return(PageLoading)
  }
};