import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ModalProvider>
      <AlertProvider>
        <App />
      </AlertProvider>
    </ModalProvider>
  </React.StrictMode>
);
