import { Dispatch, SetStateAction } from "react";

export interface Offers {
  id: number;
  icon: string;
  heading: string;
  description: string;
}

export interface EditProfProps {
  showPopup: boolean;
  setShowPopup: Dispatch<SetStateAction<boolean>>;
}
