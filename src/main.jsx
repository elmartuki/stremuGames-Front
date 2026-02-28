import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./css/index.css";
import ModalMessage from "./components/messages/ModalMessage.jsx";
import ScrollToTop from "./utils/ScrollTop.js";
import ModalTerminos from "./components/modal/Terminos.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ScrollToTop />
    <ModalMessage />
    <ModalTerminos />
    <App />
  </BrowserRouter>,
);
