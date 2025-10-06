import {PageContent, PageElement} from "../components/multiuse-elements"
import styles from "../css/login.module.css";
export function SignOut(){
  return (
    <PageContent>
      <PageElement>
        <h2> Are you sure you wish to sign out? </h2>
        <div className={styles.buttonControls}>
          <button 
            className={styles.goBack}
            onClick={()=>(console.log("Go Back"))}
          >
            <p>Go Back</p>
          </button>
          <button 
            className={styles.signOut}
            onClick={()=>(console.log("Sign Out"))}
          >
            <p>Yes, Sign Out</p>
          </button>
        </div>
      </PageElement>
    </PageContent>
  )
}
//   const sdk = useDescope()
//   useEffect(()=>{
//     async function getJWT(){
//       const session = sdk.getCurrentTenant()
//       console.log(session)
//       // const jwt = await sdk.me();
//       // console.log(jwt)
//     }
//     getJWT()  
//   }, [])
  
  // console.log(jwt)
  // try{
  //   sdk.logout()
  // } catch (e){
  //   console.log(e)
  // }
  
  // window.location.href="/"
// }