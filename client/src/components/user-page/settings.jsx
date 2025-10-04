import { PageElement } from "../multiuse-elements";

export function Settings ({userData}) {
  return(
    <PageElement title={{heading: "Your Settings"}}>
      <PageElement display="row">
        <PageElement>
          <img href={userData.photo}></img>
          <h2>{userData.username}</h2>
        </PageElement>
      </PageElement>
    </PageElement>
  )
};