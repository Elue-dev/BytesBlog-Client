import { ReactNode } from "react";

export interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  children: ReactNode;
  className: string;
}

export interface Offers {
  id: number;
  heading: string;
  description: string;
}
