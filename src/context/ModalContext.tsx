import { ContextProps, ModalProviderProps } from "@/types";
import { createContext, useState } from "react";

export const ModalContext = createContext<ContextProps | null>(null);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const [modalIcon, setModalIcon] = useState("check");
  const [route, setRoute] = useState("");

  const revealModal = (
    message: string,
    iconType: string,
    specifiedRoute: string
  ) => {
    setShowModal(true);
    setMessage(message);
    setModalIcon(iconType);
    setRoute(specifiedRoute);
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage("");
  };

  const values = {
    showModal,
    message,
    modalIcon,
    route,
    setShowModal,
    revealModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={values}>{children}</ModalContext.Provider>
  );
};