import { ThemeContextProps, ThemeProviderProps } from "@/types/context/theme";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext<ThemeContextProps | null>(null);

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<string>(() => {
    const storedMode = localStorage.getItem("themeMode");
    return storedMode ? storedMode : "light";
  });

  const toggle = () => {
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("themeMode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "themeMode") {
        setMode(event.newValue as string);
      }
    };

    window.addEventListener("storage", (event: StorageEvent) => {
      if (event.key === "themeMode") {
        const storedMode = event.newValue as string;
        setMode(storedMode);
      }
    });

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ toggle, mode, setMode }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};
