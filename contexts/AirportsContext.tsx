import React from "react";
import { createContext, useState } from "react";

interface AirportsContextType {
    airports: Airport[];
    setAirports: React.Dispatch<React.SetStateAction<Airport[]>>;
}

interface Airport {
    label: string,
    value: string,
    parent?: string
}

export const AirportsContext = createContext<AirportsContextType | undefined>(undefined)

export const AirportsProvider = ({children} : {children: React.ReactNode}) => {

    const [airports, setAirports] = useState<Airport[]>([
        { label: "Polska", value: "poland"},
        { label: "Warszawa Chopin (WAW)", value: "WAW", parent: "poland" },
        { label: "Warszawa Modlin (WMI)", value: "WMI", parent: "poland" },
        { label: "Katowice Pyrzowice (KTW)", value: "KTW", parent: "poland" },
        { label: "Kraków Balice (KRK)", value: "KRK", parent: "poland" },

        { label: "Niemcy", value: "germany"},
        { label: "Berlin Brandenburg (BER)", value: "BER", parent: "germany" },
        { label: "Frankfurt (FRA)", value: "FRA", parent: "germany" },
        { label: "Monachium (MUC)", value: "MUC", parent: "germany" },

        { label: "Francja", value: "france"},
        { label: "Paryż Charles de Gaulle (CDG)", value: "CDG", parent: "france" },
        { label: "Paryż Orly (ORY)", value: "ORY", parent: "france" },
        { label: "Lyon–Saint-Exupéry (LYS)", value: "LYS", parent: "france" },

        { label: "USA", value: "usa"},
        { label: "Nowy Jork JFK (JFK)", value: "JFK", parent: "usa" },
        { label: "Los Angeles (LAX)", value: "LAX", parent: "usa" },
        { label: "Chicago O'Hare (ORD)", value: "ORD", parent: "usa" },

        { label: "Wielka Brytania", value: "uk" },
        { label: "Londyn Heathrow (LHR)", value: "LHR", parent: "uk" },
        { label: "Londyn Gatwick (LGW)", value: "LGW", parent: "uk" },
        { label: "Manchester (MAN)", value: "MAN", parent: "uk" },

  ]);

    return (
        <AirportsContext.Provider value={{airports, setAirports}}>
            {children}
        </AirportsContext.Provider>
    )
}