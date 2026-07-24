
import { Flight } from "@/server/entities/flight.entity";

import { Airline } from "@/server/entities/airline.entity";
import { Airport } from "@/server/entities/airport.entity";

import {
  FlightStatus,
} from "@/server/entities/value-objects/flight-status.value-object";

import { CreateFlightDto } from "@/server/dto/flight/create-flight.dto";
import { UpdateFlightDto } from "@/server/dto/flight/update-flight.dto";

export class FlightBuilder {

  static fromDto(

    dto: CreateFlightDto,

    airline: Airline,

    departureAirport: Airport,

    arrivalAirport: Airport,

  ): Flight {

    return new Flight(

      0,

      new FlightStatus(dto.status),

      dto.flightNumber,

      new Date(dto.departureDateTime),

      new Date(dto.arrivalDateTime),

      departureAirport,

      arrivalAirport,

      airline,

    );

  }

  static updateFromDto(

    existing: Flight,

    dto: UpdateFlightDto,

    airline: Airline,

    departureAirport: Airport,

    arrivalAirport: Airport,

  ): Flight {

    const status =
      dto.status
        ? new FlightStatus(dto.status)
        : existing.getStatus();

    return new Flight(

      existing.getId(),

      status,

      dto.flightNumber ??
        existing.getFlightNumber(),

      dto.departureDateTime
        ? new Date(dto.departureDateTime)
        : existing.getDepartureDateTime(),

      dto.arrivalDateTime
        ? new Date(dto.arrivalDateTime)
        : existing.getArrivalDateTime(),

      departureAirport,

      arrivalAirport,

      airline,

    );

  }

}
