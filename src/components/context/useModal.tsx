import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { ContextProps } from "@/types";

export const useModal = (): ContextProps | null => {
  return useContext(ModalContext);
};
