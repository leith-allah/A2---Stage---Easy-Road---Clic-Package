
import { flightRepository }
from "@/server/repositories/flight.repository";

import { FlightMapper }
from "@/server/mappers/flight.mapper";

import { NotFoundException }
from "@/server/utils/api-error";

export const flightService = {

  async getAllFlights() {

    const flights =
      await flightRepository.findAll();

    return flights.map(
      (flight) =>
        FlightMapper.toDto(
          flight
        )
    );

  },

  async getFlightById(
    id: number
  ) {

    const flight =
      await flightRepository.findById(
        id
      );

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
    data: any
  ) {

    if (

        data.returnDate &&

        new Date(data.returnDate)
            <
        new Date(data.departureDate)

    ) {
        throw new Error(
            "La date de retour doit être après la date aller"
        );
    }

    if (

        new Date(data.arrivalTime)
            <=
        new Date(data.departureTime)

    ) {
        throw new Error(
            "L'heure d'arrivée doit être après l'heure de départ"
        );
        }

    const flight =
      await flightRepository.create(
        data
      );

    return FlightMapper.toDto(
      flight
    );

  },

  async updateFlight(
    id: number,
    data: any
  ) {

    const existingFlight =
      await flightRepository.findById(
        id
      );

    if (!existingFlight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    if (
        data.departureDate &&
        data.returnDate &&

        new Date(data.returnDate)
            <
        new Date(data.departureDate)

    ) {
        throw new Error(
            "La date de retour doit être après la date aller"
        );
        }
    
    if (

        data.departureTime &&
        data.arrivalTime &&

        new Date(data.arrivalTime)
            <=
        new Date(data.departureTime)

    ) {
        throw new Error(
            "L'heure d'arrivée doit être après l'heure de départ"
        );
    }

    const flight =
      await flightRepository.update(
        id,
        data
      );

    return FlightMapper.toDto(
      flight
    );

  },

  async deleteFlight(
    id: number
  ) {

    const existingFlight =
      await flightRepository.findById(
        id
      );

    if (!existingFlight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    return flightRepository.delete(
      id
    );

  },

};
