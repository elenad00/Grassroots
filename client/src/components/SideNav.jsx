import styles from "../css/styles.module.css"
import { CheckAuth, Username, UserPhoto } from "../functionality/Authentication";
const SideNav = () => {
  const loggedIn = CheckAuth();
  const username = Username();
  const userIcon = UserPhoto();

  const sideBarLinks = [
    {link: "/map", reference: "Venue Map"},
    {link: "/venues", reference: "Venue List"},
    {link: "/artists",reference: "Our Artists"},
    // {link: "/events", reference: "Our Events"},
  ]

  return (
    <div className={styles.sideNavContainer}>
      <div className={styles.sideNavContents}>
        {/* if the user is signed in, then show their profile */}
        {loggedIn && (
          <div className={styles.userPanel}>
            <img src={userIcon} alt="User Icon" className={styles.userImage}></img>
            <h4>{username}</h4>
          </div>
        )}
        {/* sidebar links to the different pages of the site */}
        <div className={styles.sideNavLinks}>
          {sideBarLinks.map((item, index) => (
            <div key={index} className = {styles.sideNavLink} >
              <a href={item.link} >{item.reference}</a>
            </div>
          ))}
        </div>
        {/* if the user is signed in, show profile settings, else show sign in button */}
          {loggedIn ? (
            <div className={styles.userControls}>
              <div className = {styles.sideNavLink} >
                <a href="/usersettings">User Settings</a>
              </div>
              <div className = {styles.sideNavLink} >
                <a href="">Sign Out</a>
              </div>
            </div>
          ): (
            <a href="/signin" className={styles.sideNavSignIn}> Sign In </a>
          )}
      </div>
    </div>
  )
}

export default SideNav;