import { useContext } from "react";
import { DropDownContext } from "../contexts/DropDownContext";

export const useDropDown = () => {
  const context = useContext(DropDownContext);
  if (!context) {
    throw new Error("useDropDown must be used within a DropDownProvider");
  }
  return context;
};
