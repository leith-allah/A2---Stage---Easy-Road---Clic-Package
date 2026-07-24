
import { FlightStatusValue } from "@/server/entities/value-objects/flight-status.value-object";

export interface UpdateFlightDto {

  status?: FlightStatusValue;

  flightNumber?: string;

  departureDateTime?: string;

  arrivalDateTime?: string;

  departureAirportId?: number;

  arrivalAirportId?: number;

  airlineId?: number;

}
