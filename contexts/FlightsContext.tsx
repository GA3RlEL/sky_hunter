import React from "react";
import { createContext, useState } from "react";
import { Flight } from "../types/Flight";

interface FlightsContextType {
    flightsList: Flight[]
    sortFlightsByPrice: () => void
    sortFlightsByDuration: () => void
    resetSort: () => void
}

export const FlightsContext = createContext<FlightsContextType | undefined>(undefined)

export const FlightsProvider = ({children} : {children: React.ReactNode}) => {
    const originalFlights: Flight[] = [
        {
            id: 'FL001',
            flightNumber: 'LO331',
            airline: 'LOT',
            origin: 'WAW',
            destination: 'JFK',
            departure: new Date('2024-07-28T08:30:00'),
            arrival: new Date('2024-07-28T12:45:00'),
            price: 1250,
            stops: 0,
            duration: 610,
            status: 'scheduled'
        },
        {
            id: 'FL002',
            flightNumber: 'W6 1234',
            airline: 'WizzAir',
            origin: 'WAW',
            destination: 'LTN',
            departure: new Date('2024-07-28T14:20:00'),
            arrival: new Date('2024-07-28T16:35:00'),
            price: 89,
            stops: 1,
            duration: 500,
            status: 'scheduled'
        },
    ]

    const [flightsList, setFlightsList] = useState<Flight[]>(originalFlights);

    const sortFlightsByPrice = () => {
        const sortedFlights = [...flightsList].sort((a, b) => a.price - b.price);
        setFlightsList(sortedFlights);
    };

    const sortFlightsByDuration = () => {
      const sortedFlights = [...flightsList].sort((a, b) => {
        const durationA = a.arrival.getTime() - a.departure.getTime();
        const durationB = b.arrival.getTime() - b.departure.getTime();
        return durationA - durationB;
      });
      setFlightsList(sortedFlights);
    };

    const resetSort = () => {
        setFlightsList([...originalFlights]);
    };

    return (
        <FlightsContext.Provider value={{flightsList, sortFlightsByPrice, sortFlightsByDuration, resetSort}}>
            {children}
        </FlightsContext.Provider>
    )
}