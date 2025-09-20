// import Artist from "../views/todo/Artist";
import Artists from "../views/artists";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../views/homepage";
import SignIn from "../views/sign-in";
import UserProfile from "../views/user-profile";
// import Venue from "../views/todo/Venue";
import Venues from "../views/venues";

const WebpageRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Homepage /> }/>
        <Route exact path='/artists' element={ <Artists /> }/>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/users/{username}' element={<UserProfile/>}/>
        <Route path='/venues' element={ <Venues /> }/>
        {/* <Route path='/venues' element={<Venues />}/> */}
        {/* <Route path='/venues/{venueid}' element={<Venue />}/> */}
        {/* <Route path='/artist/{artistid}' element={<Artist />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default WebpageRoutes