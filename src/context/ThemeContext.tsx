import { ThemeContextProps, ThemeProviderProps } from "@/types/context/theme";
import { createContext, useState } from "react";

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState("dark");

  const toggle = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ toggle, mode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
