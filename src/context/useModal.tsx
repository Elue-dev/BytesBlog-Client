import { useContext } from "react";
import { ModalContext } from "./ModalContext";
import { ModalContextProps } from "@/types";

export const useModal = (): ModalContextProps | null => {
  return useContext(ModalContext);
};
