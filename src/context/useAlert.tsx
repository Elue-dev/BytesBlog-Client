import { useContext } from "react";
import { AlertContext } from "./AlertContext";
import { AlertContextProps } from "@/types";

export const useAlert = (): AlertContextProps | null => {
  return useContext(AlertContext);
};
