import { useContext } from "react";
import { FlightsContext } from "../contexts/FlightsContext";

export const useFlights = () => {
  const context = useContext(FlightsContext);
  if (!context) {
    throw new Error("useFlights must be used within a FlightsProvider");
  }
  return context;
};
