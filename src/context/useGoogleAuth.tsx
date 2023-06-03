import { useContext } from "react";
import { GoogleAuthContextProps } from "@/types/context/o_auth";
import { GoogleAuthContext } from "./GoogleAuthContext";

export const useGoogleAuth = (): GoogleAuthContextProps | null => {
  return useContext(GoogleAuthContext);
};
