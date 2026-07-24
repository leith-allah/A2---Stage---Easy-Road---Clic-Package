
import { AirlineDto } from "../airline/airline.dto";
import { AirportDto } from "../airport/airport.dto";

import { FlightStatusValue } from "@/server/entities/value-objects/flight-status.value-object";

export interface FlightDto {

  id: number;

  status: FlightStatusValue;

  flightNumber: string;

  departureDateTime: string;

  arrivalDateTime: string;

  airline: AirlineDto;

  departureAirport: AirportDto;

  arrivalAirport: AirportDto;

}
