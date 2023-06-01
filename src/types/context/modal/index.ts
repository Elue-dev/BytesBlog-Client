import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ModalContextProps {
  modalIcon: string;
  message: string;
  showModal: boolean;
  route: string;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  revealModal: (
    message: string,
    specifiedRoute: string,
    iconType?: string | ""
  ) => void;
  closeModal: () => void;
}
