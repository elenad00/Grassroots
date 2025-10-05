import { PageElement } from "../multiuse-elements";
import styles from "../../css/user-page.module.css"

export function Settings ({userInfo}) {

  return (
    <PageElement >
      <PageElement display="row">
        <img src={userInfo.photo}></img>
        <PageElement>
          <h2>{userInfo.username}</h2>
          <p>{userInfo.email}</p>
        </PageElement>
      </PageElement>
    </PageElement>
  )
};