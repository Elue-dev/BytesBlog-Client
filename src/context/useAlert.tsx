import { useContext } from "react";
import { AlertContextProps } from "@/types/context/alert";
import { AlertContext } from "./AlertContext";

export const useAlert = (): AlertContextProps | null => {
  return useContext(AlertContext);
};
