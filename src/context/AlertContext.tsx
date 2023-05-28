import { AlertContextProps, AlertProviderProps } from "@/types";
import { createContext, useState } from "react";

export const AlertContext = createContext<AlertContextProps | null>(null);

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState<
    "success" | "info" | "warn" | "error" | undefined
  >("success");
  const [message, setMessage] = useState("");

  const revealAlert = (
    message: string,
    severity: "success" | "info" | "warn" | "error" | string
  ) => {
    setShowAlert(true);
    setMessage(message);
    setSeverity(severity as "success" | "info" | "warn" | "error" | undefined);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  const values = {
    showAlert,
    setShowAlert,
    closeAlert,
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
