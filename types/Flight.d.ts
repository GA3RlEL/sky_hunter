export interface Flight {
  id: string;
  flightNumber: string;
  airline: string;
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  price: number;
  stops?: number; // 0 = direct, 1+ = przesiadki
  duration?: number; // np. "2h 30m"
  status?: 'scheduled' | 'delayed' | 'cancelled';
}