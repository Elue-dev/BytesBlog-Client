import { useContext } from "react";
import { ModalContextProps } from "@/types/context/modal";
import { ModalContext } from "./ModalContext";

export const useModal = (): ModalContextProps | null => {
  return useContext(ModalContext);
};
