import {
  ReactNode,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MutableRefObject,
  FocusEventHandler,
} from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  className: string;
  onClick?: (() => void) | undefined;
}

export interface Offers {
  id: number;
  icon: string;
  heading: string;
  description: string;
}

export interface CAValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SIValues {
  email: string;
  password: string;
}

export interface RPValues {
  password: string;
  confirmPassword: string;
}

export interface CAProps {
  values: CAValues;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
  previousStep?: () => void;
}

export interface InterestsProps {
  interests: string[];
  values: CAValues;
  initialValues: CAValues;
  setValues: Dispatch<SetStateAction<CAProps["values"]>>;
  setInterests: Dispatch<SetStateAction<InterestsProps["interests"]>>;
  previousStep?: () => void;
}

export interface InputProps {
  type: string;
  name?: string;
  ref?: MutableRefObject<any>;
  onInput?: FocusEventHandler<HTMLInputElement>;
  className: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface ModalProviderProps {
  children: ReactNode;
}

export interface ContextProps {
  modalIcon: string;
  message: string;
  showModal: boolean;
  route: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  revealModal: (
    message: string,
    specifiedRoute: string,
    iconType?: string | ""
  ) => void;
  closeModal: () => void;
}

export interface ModalProps {
  message: string;
}

export interface Post {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  content: string;
  likes: number;
  read_time: number;
  date: string;
  comments: number;
  user: {
    name: string;
    photo: string;
  };
}
