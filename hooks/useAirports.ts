import { useContext } from "react";
import { AirportsContext } from "../contexts/AirportsContext";

export const useAirports = () => {
  const context = useContext(AirportsContext);
  if (!context) {
    throw new Error("useAirports must be used within a AirportsProvider");
  }
  return context;
};
