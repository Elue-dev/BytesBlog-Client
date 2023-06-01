import { AlertContextProps } from "@/types/context/alert";
import { useContext } from "react";
import { AlertContext } from "./AlertContext";

export const useAlert = (): AlertContextProps | null => {
  return useContext(AlertContext);
};
