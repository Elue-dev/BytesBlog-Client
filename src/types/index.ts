import { ReactNode, Dispatch, SetStateAction, ChangeEvent } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  className: string;
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

export interface CAProps {
  values: CAValues;
  setValues: Dispatch<SetStateAction<CAProps["values"]>>;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nextStep?: () => void;
  previousStep?: () => void;
}

export interface InputProps {
  type: string;
  className: string;
}
