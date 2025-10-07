import { PageElement } from "../../client/src/components/multiuse-elements";
import styles from "../../css/user-page.module.css"

export function Settings ({userInfo}) {
  return (
    <PageElement >
      <PageElement display="row">
        <img src={userInfo.picture}></img>
        <PageElement>
          <h2>{userInfo.username}</h2>
          <p>{userInfo.email}</p>
        </PageElement>
      </PageElement>
    </PageElement>
  )
};