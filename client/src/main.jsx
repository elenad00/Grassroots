import { StrictMode } from "react";
import { AuthProvider } from "@descope/react-sdk";
import { createRoot } from "react-dom/client";

import HeaderBar from "./components/HeaderBar";
import FooterBar from "./components/FooterBar";
import WebpageRoutes from "./functionality/Routes";
import config from "./functionality/Config";

import styles from "./css/core.module.css";

const App = () =>{
  return (
    <AuthProvider projectId={config.AUTH.PROJECT_ID} sessionTokenViaCookie>
      <div className={styles.appContainer}>
        <HeaderBar />
        <div className={styles.bodyContentContainer}>
          <WebpageRoutes />
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
