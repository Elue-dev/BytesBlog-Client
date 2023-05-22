import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ModalProvider } from "./components/context/ModalContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <App />
    </ModalProvider>
  </React.StrictMode>
);
