import { Authenticate } from "../views/authenticate"
import { BrowserRouter, Route, Routes } from "react-router";
import { DataCardPage } from "../views/data-card-page";
import { Homepage } from "../views/homepage";
import { SignIn } from "../views/sign-in";
import { SignOut } from "../views/sign-out";
import { SingleValuePage } from "../views/todo/single-value-page";
import { UserPage } from "../views/user-page";

export function WebpageRoutes () {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/artists' element={<DataCardPage dataKey="artists"/>}/>
        <Route exact path='/artists/:artistName' element={<SingleValuePage />}/>
        <Route exact path='/sign-in/auth' element={<Authenticate />} />
        <Route exact path='/sign-in' element={<SignIn/>} />
        <Route exact path='/sign-out' element={<SignOut/>} />
        <Route exact path='/user' element={<UserPage/>}/>
        <Route exact path='/user/settings' element={<UserPage/>}/>
        <Route exact path='/user/favourite-artists' element={<UserPage/>}/>
        <Route exact path='/user/favourite-venues' element={<UserPage/>}/>
        <Route exact path='/venues' element={<DataCardPage dataKey="venues"/>}/>
        <Route exact path='/venues/:venueName' element={<SingleValuePage />}/>
      </Routes>
    </BrowserRouter>
  )
}