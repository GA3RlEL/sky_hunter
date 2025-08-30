export interface FlightSegment {
  origin: string,
  destination: string,
  departureTimestamp: Date,
  arrivalTimestamp: Date,
  duration: number,
  carrier: string,
}

export interface Flight {
  id: string,
  type: "inbound" | "outbound",
  duration: number,
  numberOfStops: number,
  segments: FlightSegment[],
}

export interface FlightOffer {
  id: string,
  origin: string,
  destination: string,
  price: number,
  is_return_trip: boolean,
  total_stops: number,
  total_duration: number,
  itineraries: Flight[];
}