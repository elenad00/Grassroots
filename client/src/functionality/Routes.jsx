// import Artist from "../views/todo/Artist";
import Artists from "../views/artists";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "../views/homepage";
import SignIn from "../views/sign-in";
import UserProfile from "../views/user-profile";
import Venue from "../views/todo/venue";
import Venues from "../views/venues";
import { ValidateUser} from "../views/auth";

const WebpageRoutes = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Homepage /> }/>
        <Route exact path='/artists' element={ <Artists /> }/>
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/auth' element={<ValidateUser/>} />
        <Route path='/users/{username}' element={<UserProfile/>}/>
        <Route path='/venues' element={ <Venues /> }/>
        <Route path='/venues/{venueid}' element={<Venue />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default WebpageRoutes