import { StrictMode, useState } from "react";
import { AuthProvider, useSession, useUser } from "@descope/react-sdk";
import { createRoot } from "react-dom/client";

import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import SideNav from "./components/SideNav";
import WebpageRoutes from "./functionality/Routes";
import config from "./functionality/Config";
import styles from "./css/styles.module.css";

const App = () =>{
  const [sideNavOpen, showSideNav] = useState(false);
  return (
    <AuthProvider projectId={config.AUTH.PROJECT_ID} sessionTokenViaCookie>
      <div className={styles.appContainer}>
        <HeaderBar showSideNav={showSideNav}/>
        <div className={styles.bodyContent}>
          <div className={styles.bodyContentContainer}>
            <WebpageRoutes />
          </div>
          { sideNavOpen && (
            <SideNav/>
          )}
        </div>
        <FooterBar />
      </div>
    </AuthProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
