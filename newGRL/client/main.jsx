import { createRoot } from "react-dom/client";
import Footer from "./src/page_elements/footer.jsx";
import Header from "./src/page_elements/header.jsx";
import Homepage from "./src/views/homepage.jsx";
import "./src/views/css/core.module.css";

function WebpageRoutes(){
  return(
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />}/>
        {/* <Route 
          exact 
          path='/artists' 
          element={<DataCardPage dataKey="artists"/>
        }/>
        <Route
          exact
          path='/artists/:artistName'
          element={<SingleValuePage />}
        />
        <Route exact path='/sign-in' element={<SignIn/>} />
        <Route exact path='/sign-in/otp' element={<SignInAuth />} />
        <Route
          exact
          path='/sign-in/oauth/:provider/:token'
          elements={handle_oauth_token()}
        />
        <Route exact path='/sign-up' element={<CreateAccount />} />
        <Route exact path='/sign-out' element={<SignOut/>} />
        <Route path='/user/:subPage' element={<UserPage/>}/>
        <Route
          exact
          path='/venues'
          element={<DataCardPage dataKey="venues"/>}
        />
        <Route 
          exact 
          path='/venues/:venueName' 
          element={<SingleValuePage />}
        />
        <Route path="*" element={<UnknownPage />}/> */}
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <Header />
    <WebpageRoutes />
    <Footer />
  </>
)