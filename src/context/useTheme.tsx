import { useContext } from "react";
import { ThemeContextProps } from "@/types/context/theme";
import { ThemeContext } from "./ThemeContext";

export const useTheme = (): ThemeContextProps | null => {
  return useContext(ThemeContext);
};
