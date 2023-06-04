import { ReactNode } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextProps {
  mode: string;
  toggle: () => void;
}
