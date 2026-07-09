
export interface UpdateFlightDto {

  airline?: string;

  departureLocation?: string;

  destination?: string;

  departureDate?: Date;

  departureTime?: Date;

  arrivalTime?: Date;

  returnDate?: Date | null;

  returnDepartureTime?: Date | null;

  returnArrivalTime?: Date | null;

  flightNumber?: string;

}
