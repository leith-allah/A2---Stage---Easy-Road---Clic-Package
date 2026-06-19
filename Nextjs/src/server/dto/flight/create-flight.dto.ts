
export interface CreateFlightDto {

  airline: string;

  departureLocation: string;

  destination: string;

  departureDate: string;

  departureTime: string;

  arrivalTime: string;

  returnDate?: string;

  returnDepartureTime?: string;

  returnArrivalTime?: string;

  flightNumber: string;

}
