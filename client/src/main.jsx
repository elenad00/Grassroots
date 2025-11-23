import { createRoot } from "react-dom/client";
import { HeaderBar, FooterBar } from "./components/header-footer-bar";
import { WebpageRoutes } from "./functionality/website-routes";
import "./css/core.module.css";

createRoot(document.getElementById("root")).render(
  <>
    <HeaderBar />
    <WebpageRoutes />
    <FooterBar />
  </>
);
