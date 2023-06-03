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
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

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
  };

  const values = {
    firstName,
    lastName,
    email,
    avatar,
    setFirstName,
    setLastName,
    setEmail,
    setAvatar,
    updateCredentials,
  };

  return (
    <GoogleAuthContext.Provider value={values}>
      {children}
    </GoogleAuthContext.Provider>
  );
};
