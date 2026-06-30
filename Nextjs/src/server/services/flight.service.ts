
import { flightRepository }
from "@/server/repositories/flight.repository";

import { FlightMapper }
from "@/server/mappers/flight.mapper";

import { CreateFlightDto }
from "@/server/dto/flight/create-flight.dto";

import { UpdateFlightDto }
from "@/server/dto/flight/update-flight.dto";

import { NotFoundException }
from "@/server/utils/api-error";

export const flightService = {

  async getAllFlights() {

    const flights =
      await flightRepository.findAll();

    return flights.map(
      (flight) =>
        FlightMapper.toDto(flight)
    );

  },

  async getFlightById(
    id: number
  ) {

    const flight =
      await flightRepository.findById(id);

    if (!flight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    return FlightMapper.toDto(
      flight
    );

  },

  async createFlight(
    dto: CreateFlightDto
  ) {

    if (

      dto.returnDate &&

      new Date(dto.returnDate)
        <
      new Date(dto.departureDate)

    ) {

      throw new Error(
        "La date de retour doit être après la date aller"
      );

    }

    if (

      new Date(dto.arrivalTime)
        <=
      new Date(dto.departureTime)

    ) {

      throw new Error(
        "L'heure d'arrivée doit être après l'heure de départ"
      );

    }

    return flightRepository.create({

      airline:
        dto.airline,

      departureLocation:
        dto.departureLocation,

      destination:
        dto.destination,

      departureDate:
        new Date(dto.departureDate),

      departureTime:
        new Date(`1970-01-01T${dto.departureTime}:00`),

      arrivalTime:
        new Date(`1970-01-01T${dto.arrivalTime}:00`),

      returnDate:
        dto.returnDate
          ? new Date(dto.returnDate)
          : null,

      returnDepartureTime:
        dto.returnDepartureTime
          ? new Date(`1970-01-01T${dto.returnDepartureTime}:00`)
          : null,

      returnArrivalTime:
        dto.returnArrivalTime
          ? new Date(`1970-01-01T${dto.returnArrivalTime}:00`)
          : null,

      flightNumber:
        dto.flightNumber,

    });
  },

  async updateFlight(

    id: number,

    dto: UpdateFlightDto

  ) {

    const existingFlight =
      await flightRepository.findById(id);

    if (!existingFlight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    if (

      dto.departureDate &&
      dto.returnDate &&

      new Date(dto.returnDate)
        <
      new Date(dto.departureDate)

    ) {

      throw new Error(
        "La date de retour doit être après la date aller"
      );

    }

    if (

      dto.departureTime &&
      dto.arrivalTime &&

      new Date(dto.arrivalTime)
        <=
      new Date(dto.departureTime)

    ) {

      throw new Error(
        "L'heure d'arrivée doit être après l'heure de départ"
      );

    }

    const flight =
      await flightRepository.update(
        id,
        dto
      );

    return FlightMapper.toDto(
      flight
    );

  },

  async deleteFlight(
    id: number
  ) {

    const existingFlight =
      await flightRepository.findById(id);

    if (!existingFlight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    return flightRepository.delete(id);

  },

};
