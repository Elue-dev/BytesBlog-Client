import { ChangeEvent, Dispatch, SetStateAction } from "react";

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

export interface CAValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type SIValues = Pick<CAValues, "email" | "password">;

export type RPValues = Pick<CAValues, "password" | "confirmPassword">;
