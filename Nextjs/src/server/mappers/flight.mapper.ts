
import { Flight } from "@/server/entities/flight.entity";

import { FlightDto } from "@/server/dto/flight/flight.dto";

import { FlightPersistence } from "@/server/persistence/flight.persistence";

import {
  FlightStatus,
  FlightStatusValue,
} from "@/server/entities/value-objects/flight-status.value-object";

import { AirlineMapper } from "./airline.mapper";
import { AirportMapper } from "./airport.mapper";

export class FlightMapper {

  static toEntity(
    persistence: FlightPersistence,
  ): Flight {

    return new Flight(

      Number(persistence.id_vol),

      new FlightStatus(
        persistence.statut_vol as FlightStatusValue,
      ),

      persistence.num_vol,

      persistence.depart_vol,

      persistence.arrivee_vol,

      AirportMapper.toEntity(
        persistence.aeroport_vol_id_aeroport_departToaeroport,
      ),

      AirportMapper.toEntity(
        persistence.aeroport_vol_id_aeroport_arriveeToaeroport,
      ),

      AirlineMapper.toEntity(
        persistence.compagnie_aerienne,
      ),

    );

  }

  static toEntities(
    persistences: FlightPersistence[],
  ): Flight[] {

    return persistences.map(
      (persistence) => FlightMapper.toEntity(persistence),
    );

  }

  static toDto(
    flight: Flight,
  ): FlightDto {

    return {

      id: flight.getId(),

      status: flight.getStatus().getValue(),

      flightNumber: flight.getFlightNumber(),

      departureDateTime:
        flight
          .getDepartureDateTime()
          .toISOString(),

      arrivalDateTime:
        flight
          .getArrivalDateTime()
          .toISOString(),

      airline:
        AirlineMapper.toDto(
          flight.getAirline(),
        ),

      departureAirport:
        AirportMapper.toDto(
          flight.getDepartureAirport(),
        ),

      arrivalAirport:
        AirportMapper.toDto(
          flight.getArrivalAirport(),
        ),

    };

  }

}
