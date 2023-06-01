import { Dispatch, ReactNode, SetStateAction } from "react";

export interface AlertProviderProps {
  children: ReactNode;
}

export interface AlertContextProps {
  showAlert: boolean;
  severity: "success" | "info" | "warn" | "error" | undefined;
  setSeverity: Dispatch<SetStateAction<AlertContextProps["severity"]>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  closeAlert: () => void;
  message: string;
  setMessage: Dispatch<SetStateAction<AlertContextProps["message"]>>;
  revealAlert: (
    message: string,
    severity: "success" | "info" | "warn" | "error" | string
  ) => void;
}
