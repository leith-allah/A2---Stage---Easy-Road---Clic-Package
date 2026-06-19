
export interface FlightDto {

  id: number;

  airline: string;

  departureLocation: string;

  destination: string;

  departureDate: string;

  departureTime: string;

  arrivalTime: string;

  returnDate?: string | null;

  returnDepartureTime?: string | null;

  returnArrivalTime?: string | null;

  flightNumber: string;

}
