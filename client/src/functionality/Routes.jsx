import { BrowserRouter, Routes, Route } from "react-router";

import SignIn from "../views/SignIn";
import Home from "../views/Home";
import Map from "../views/Map";
// import Venues from "../views/todo/Venues";
// import Venue from "../views/todo/Venue";
import Artists from "../views/Artists";
// import Artist from "../views/todo/Artist";
import UserProfile from "../views/UserProfile";

const WebpageRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/map' element={ <Map /> }/>
        {/* <Route path='/venues' element={<Venues />}/> */}
        {/* <Route path='/venues/{venueid}' element={<Venue />}/> */}
        <Route exact path='/artists' element={ <Artists /> }/>
        {/* <Route path='/artist/{artistid}' element={<Artist />}/> */}
        <Route path='/users/{username}' element={<UserProfile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default WebpageRoutes