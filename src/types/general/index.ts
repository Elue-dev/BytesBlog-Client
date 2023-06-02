import { Dispatch, SetStateAction } from "react";

export interface Offers {
  id: number;
  icon: string;
  heading: string;
  description: string;
}

export interface EditProfProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
