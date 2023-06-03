import { Dispatch, ReactNode, SetStateAction } from "react";

export interface GoogleAuthProviderProps {
  children: ReactNode;
}

export interface GoogleAuthContextProps {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAvatar: Dispatch<SetStateAction<string>>;
  updateCredentials: (
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
  ) => void;
}
