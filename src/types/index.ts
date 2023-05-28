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

export interface AlertProviderProps {
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

export interface AlertContextProps {
  showAlert: boolean;
  severity: "success" | "info" | "warn" | "error" | undefined;
  setSeverity: Dispatch<SetStateAction<AlertContextProps["severity"]>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
  message: string;
  setMessage: Dispatch<SetStateAction<AlertContextProps["message"]>>;
  revealAlert: (
    message: string,
    severity: "success" | "info" | "warn" | "error" | string
  ) => void;
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

export interface RightDetailsProps {
  similarPosts: Post[];
}

export interface Comment {
  id: number;
  author: string;
  image: string;
  date: string;
  comment: string;
  isMine: boolean;
}

export interface AddBPost {
  title: string;
  readTime: string;
}

export interface StepOneprops {
  values: AddBPost;
  image: File | undefined;
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  setImage: Dispatch<SetStateAction<File | undefined>>;
  imagePreview: string | undefined;
  setImagePreview: Dispatch<SetStateAction<string | undefined>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
}

export interface StepTwoProps {
  categories: string[];
  values: AddBPost;
  initialValues: AddBPost;
  names: string[];
  setNames: Dispatch<SetStateAction<StepTwoProps["names"]>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setValues: Dispatch<SetStateAction<StepTwoProps["values"]>>;
  setCategories: Dispatch<SetStateAction<StepTwoProps["categories"]>>;
  previousStep?: () => void;
}
