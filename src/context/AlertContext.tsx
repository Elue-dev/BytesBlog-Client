import { AlertContextProps, AlertProviderProps } from "@/types";
import { createContext, useState } from "react";

export const AlertContext = createContext<AlertContextProps | null>(null);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState(""); //info, success, warn, error
  const [message, setMessage] = useState("");

  const revealAlert = (message: string, severity: string) => {
    setShowAlert(true);
    setMessage(message);
    setSeverity(severity);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const values = {
    showAlert,
    setShowAlert,
    message,
    severity,
    setSeverity,
    setMessage,
    revealAlert,
  };

  return (
    <AlertContext.Provider value={values}>{children}</AlertContext.Provider>
  );
};