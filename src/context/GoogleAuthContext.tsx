import {
  GoogleAuthContextProps,
  GoogleAuthProviderProps,
} from "@/types/context/o_auth";
import { createContext, useState } from "react";

export const GoogleAuthContext = createContext<GoogleAuthContextProps | null>(
  null
);

export const GoogleAuthProvider = ({ children }: GoogleAuthProviderProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mail, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isGoogle, setIsGoogle] = useState(false);

  const updateCredentials = (
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
  ) => {
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setAvatar(avatar);
    setIsGoogle(true);
  };

  const clearCredentials = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAvatar("");
    setIsGoogle(false);
  };

  const values = {
    firstName,
    lastName,
    mail,
    avatar,
    isGoogle,
    setFirstName,
    setLastName,
    setEmail,
    setAvatar,
    setIsGoogle,
    updateCredentials,
    clearCredentials,
  };

  return (
    <GoogleAuthContext.Provider value={values}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
