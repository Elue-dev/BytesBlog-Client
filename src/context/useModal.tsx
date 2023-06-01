import { ModalContextProps } from "@/types/context/modal";
import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export const useModal = (): ModalContextProps | null => {
  return useContext(ModalContext);
};
