import { createRoot } from "react-dom/client";
import { FooterBar } from "./components/footer-bar";
import GetUUID from "./functionality/uuid-setter-getter";
import { HeaderBar } from "./components/header-bar";
import { StrictMode } from "react";
import { WebpageRoutes } from "./functionality/routes";
import "./css/core.module.css";

GetUUID();

createRoot(document.getElementById("root")).render(
  <>
    <HeaderBar />
    <WebpageRoutes />
    <FooterBar />
  </>
);
