import { Dispatch, ReactNode, SetStateAction } from "react";

export interface GoogleAuthProviderProps {
  children: ReactNode;
}

export interface GoogleAuthContextProps {
  firstName: string;
  lastName: string;
  mail: string;
  avatar: string;
  isGoogle: boolean;
  setFirstName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setAvatar: Dispatch<SetStateAction<string>>;
  setIsGoogle: Dispatch<SetStateAction<boolean>>;
  updateCredentials: (
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
  ) => void;
  clearCredentials: () => void;
}
