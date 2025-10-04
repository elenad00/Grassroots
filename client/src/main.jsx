import { AuthProvider } from "@descope/react-sdk";
import { config } from "./functionality/config";
import { createRoot } from "react-dom/client";
import { FooterBar } from "./components/footer-bar";
import { HeaderBar } from "./components/header-bar";
import { StrictMode } from "react";
import { WebpageRoutes } from "./functionality/routes";
import "./css/core.module.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider 
      projectId={config.AUTH.PROJECT_ID}
      persistTokens={false}
      sessionTokenViaCookie={false}
      storeLastAuthenticatedUser={false}
      keepLastAuthenticatedUserAfterLogout={false} 
    >
      <>
        <HeaderBar />
        <WebpageRoutes />
        <FooterBar />
      </>
    </AuthProvider>
  </StrictMode>
);
