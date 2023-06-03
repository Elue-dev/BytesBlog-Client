import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AlertProvider } from "./context/AlertContext";
import { ModalProvider } from "./context/ModalContext";
import { GoogleAuthProvider } from "./context/GoogleAuthContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from "./redux/store";

const persistor = persistStore(store);
const queryClient = new QueryClient();
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalProvider>
            <AlertProvider>
              <GoogleAuthProvider>
                <App />
              </GoogleAuthProvider>
            </AlertProvider>
          </ModalProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
