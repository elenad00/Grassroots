import { NavButton, PageElement } from "../multiuse-elements";
import styles from "../../css/user-page.module.css";

function FavouriteContainer({type, userInfo}){
  const favourites = type == 'Artists' ? userInfo.favArtists : userInfo.favVenues;
  const lowerType = type.toLowerCase();

  function FavouritesGrid(){
    const topThree = favourites.slice(2);
    return (
      <div className={styles.userFavourites}>
        {topThree.map((favourite) => {
          <>
            <img src={favourite.picture}></img>
            <p>{favourite.name}</p>
          </>
        })}
        <NavButton content={{link:`/user/favourite${lowerType}`, text: "View All"}} />
      </div>
    )
  }

  function NoFavourites(){
    return(
      <>
        <p> Looks like you don't have any favourite {lowerType} yet </p>
        <NavButton content={{link:`/${lowerType}`, title: "Go Find Some"}} />
      </>
    )
  }

  return(
    <div className={styles.favContainer}>
      <h3> Your Favourite {type} </h3>
      {favourites ? <FavouritesGrid />  : <NoFavourites />}
    </div>
  )
}

export function Profile ({userInfo}){
  return(
    <PageElement display="row">
      <div className={styles.profile}>
        <img src={userInfo.photo}></img>
        <h2>{userInfo.username}</h2>
        <p>{userInfo.email}</p>
        <NavButton content={{link:"/user/settings", title:"Edit Profile"}} />
      </div>
      <div className={styles.favourites}>
        <FavouriteContainer type="Artists" userInfo={userInfo}/>
        <FavouriteContainer type="Venues" userInfo={userInfo} />
      </div>
    </PageElement>
  )
};