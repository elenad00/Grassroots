import { BrowserRouter, Route, Routes } from "react-router";
import { DataCardPage } from "../views/data-card-page";
import { Homepage } from "../views/homepage";
import { InitialAuth } from "../views/auth";
import { SignIn } from "../views/sign-in";
import { SingleValuePage } from "../views/todo/single-value-page";
import { UserPage } from "../views/user-page";

export function WebpageRoutes () {
  return(
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route exact path='/auth' element={<InitialAuth/>}/>
        <Route exact path='/artists' element={<DataCardPage dataKey="artists"/>}/>
        <Route path='/artists/:artistName' element={<SingleValuePage />}/>
        <Route exact path='/sign-in' element={<SignIn/>} />
        <Route exact path='/sign-out' element={<SignIn/>} />
        <Route exact path='/user' element={<UserPage/>}/>
        <Route exact path='/user/settings' element={<UserPage/>}/>
        <Route exact path='/user/favouriteartists' element={<UserPage/>}/>
        <Route exact path='/user/favouritevenues' element={<UserPage/>}/>
        <Route exact path='/venues' element={<DataCardPage dataKey="venues"/>}/>
        <Route path='/venues/:venueName' element={<SingleValuePage />}/>
      </Routes>
    </BrowserRouter>
  )
}