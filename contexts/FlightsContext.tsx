import React, { useCallback } from "react";
import { createContext, useState } from "react";
import { Flight, FlightOffer, FlightSegment } from "../types/Flight";
import axios from "axios"

interface FlightsContextType {
    flightsList: FlightOffer[]
    sortFlightsByPrice: () => void
    sortFlightsByDuration: () => void
    resetSort: () => void
    searchFlights: (params: SearchParams) => Promise<void>;
    loading: boolean;
}

interface SearchParams {
    origins: string,
    destinations: string,
    departure_date: string,
    departure_date_max?: string,
    return_date?: string,
    return_date_max?: string,
    min_nights?: number,
    max_nights?: number,
    adults?: number,
}

export const FlightsContext = createContext<FlightsContextType | undefined>(undefined)

export const FlightsProvider = ({children} : {children: React.ReactNode}) => {
    const [originalFlights, setOriginalFlights] = useState<FlightOffer[]>([]);

    const [flightsList, setFlightsList] = useState<FlightOffer[]>(originalFlights);
    const [loading, setLoading] = useState<boolean>(false);

    const API_URL = "http://192.168.0.81:8000";

    const searchFlights = useCallback(async (params: SearchParams) => {
        setLoading(true)

        try {
            const parameters = new URLSearchParams();
            parameters.append("origin", params.origins);
            parameters.append("destination", params.destinations);
            parameters.append("departure_date", params.departure_date);
            
            if (params.departure_date_max) parameters.append("departure_date_max", params.departure_date_max);
            if (params.return_date) parameters.append("return_date", params.return_date);
            if (params.return_date_max) parameters.append("return_date_max", params.return_date_max);
            if (params.min_nights) parameters.append("min_nights", params.min_nights.toString());
            if (params.max_nights) parameters.append("max_nights", params.max_nights.toString());

            const response = await fetch(`${API_URL}/search?${parameters}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error occured: ${response.status}`);
            }

            const data = await response.json();
            
            const flightOffers: FlightOffer[] = []

            data.forEach((flightOffer: FlightOffer) => {
                const tempFlights: Flight[] = []

                flightOffer.itineraries.forEach((flight: Flight) => {

                    const segments: FlightSegment[] = [];
                    flight.segments.forEach((segment: FlightSegment) => {
                        segments.push({
                            "origin": segment.origin,
                            "destination": segment.destination,
                            "departureTimestamp": new Date(segment.departureTimestamp),
                            "arrivalTimestamp": new Date(segment.arrivalTimestamp),
                            "duration": segment.duration,
                            "carrier": segment.carrier,
                        })
                    })

                    const tempFlight: Flight = {
                        "id": flight.id,
                        "type": flight.type,
                        "duration": flight.duration,
                        "numberOfStops": flight.numberOfStops,
                        "segments": segments,
                    }

                    tempFlights.push(tempFlight);

                });


                flightOffers.push({
                    id: flightOffer.id,
                    origin: flightOffer.origin,
                    destination: flightOffer.destination,
                    price: flightOffer.price,
                    is_return_trip: flightOffer.is_return_trip,
                    total_stops: flightOffer.total_stops,
                    total_duration: flightOffer.total_duration,
                    itineraries: tempFlights,
                })
            });

            setOriginalFlights(flightOffers)
            setFlightsList(flightOffers)

            setLoading(false)
            
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }, []);

    const sortFlightsByPrice = () => {
        const sortedFlights = [...flightsList].sort((a, b) => a.price - b.price);
        setFlightsList(sortedFlights);
    };

    const sortFlightsByDuration = () => {
      const sortedFlights = [...flightsList].sort((a, b) => {
        const durationA = a.total_duration;
        const durationB = b.total_duration;
        return durationA - durationB;
      });
      setFlightsList(sortedFlights);
    };

    const resetSort = () => {
        setFlightsList([...originalFlights]);
    };

    return (
        <FlightsContext.Provider value={{flightsList, sortFlightsByPrice, sortFlightsByDuration, resetSort, searchFlights, loading}}>
            {children}
        </FlightsContext.Provider>
    )
}