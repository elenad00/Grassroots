import { AuthProvider } from "@descope/react-sdk";
import config from "./functionality/config";
import { createRoot } from "react-dom/client";
import FooterBar from "./components/footer-bar";
import HeaderBar from "./components/header-bar";
import { StrictMode } from "react";
import styles from "./css/core.module.css";
import WebpageRoutes from "./functionality/routes";


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
