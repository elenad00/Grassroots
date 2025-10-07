import { createRoot } from "react-dom/client";
import { FooterBar } from "./components/footer-bar";
import { GetSessionId, SetSessionId } from "./functionality/session-storage";
import { HeaderBar } from "./components/header-bar";
import { WebpageRoutes } from "./functionality/routes";
import "./css/core.module.css";

if(!GetSessionId()){
  SetSessionId()
}

createRoot(document.getElementById("root")).render(
  <>
    <HeaderBar />
    <WebpageRoutes />
    <FooterBar />
  </>
);
