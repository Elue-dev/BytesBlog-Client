import { Dispatch, ReactNode, SetStateAction } from "react";

export interface ThemeProviderProps {
  children: ReactNode;
}

export interface ThemeContextProps {
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  toggle: () => void;
}
