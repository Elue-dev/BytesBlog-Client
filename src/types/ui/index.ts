import {
  ChangeEvent,
  FocusEventHandler,
  MutableRefObject,
  ReactNode,
} from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  className: string;
  onClick?: (() => void) | undefined;
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
