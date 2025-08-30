import React from "react";
import { createContext, useState } from "react";

interface DropDownContextType {
    departure: string[],
    arrival: string[],
    setDeparture: React.Dispatch<React.SetStateAction<string[]>>;
    setArrival: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DropDownContext = createContext<DropDownContextType | undefined>(undefined)

export const DropDownProvider = ({children} : {children: React.ReactNode}) => {

    const [departure, setDeparture] = useState<string[]>([])
    const [arrival, setArrival] = useState<string[]>([])

    return (
        <DropDownContext.Provider value={{departure, arrival, setDeparture, setArrival}}>
            {children}
        </DropDownContext.Provider>
    )
}