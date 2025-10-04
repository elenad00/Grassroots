import { PageElement } from "../multiuse-elements";

export function Favourites ({userData, data}) {
  return(
    <PageElement title={{heading: `Your Favourite ${data}`, subheading:""}}>
      <PageElement display="row">
        <PageElement>
          <img href={userData.photo}></img>
          <h2>{userData.username}</h2>
        </PageElement>
      </PageElement>
    </PageElement>
  )
}

export default Favourites;