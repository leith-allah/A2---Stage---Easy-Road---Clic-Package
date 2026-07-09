
import { prisma } from "@/server/db/prisma";

import { Flight } from "@/server/entities/flight.entity";

import { FlightRepository } from "../interfaces/flight.repository.interface";

import { FlightMapper } from "@/server/mappers/flight.mapper";

export class PrismaFlightRepository implements FlightRepository {

  async findAll(): Promise<Flight[]> {

    const flights = await prisma.vol.findMany({

      where: {

        NOT: {

          statut_vol: "ARCHIVED",

        },

      },

      orderBy: {

        date_aller_vol: "asc",

      },

    });

    return flights.map((flight) =>
      FlightMapper.toEntity(flight)
    );

  }

  async findById(
    id: number
  ): Promise<Flight | null> {

    const flight = await prisma.vol.findUnique({

      where: {

        id_vol: BigInt(id),

      },

    });

    if (!flight) {

      return null;

    }

    return FlightMapper.toEntity(flight);

  }

  async createAggregate(
    flight: Flight
  ): Promise<Flight> {

    const created = await prisma.vol.create({

      data: {

        compagnie_vol: flight.airline,

        lieu_depart_vol: flight.departureLocation,

        destination_vol: flight.destination,

        date_aller_vol: flight.departureDate,

        heure_depart_aller_vol: flight.departureTime,

        heure_arrivee_aller_vol: flight.arrivalTime,

        date_retour_vol: flight.returnDate,

        heure_depart_retour_vol: flight.returnDepartureTime,

        heure_arrivee_retour_vol: flight.returnArrivalTime,

        num_vol: flight.flightNumber,

      },

    });

    return FlightMapper.toEntity(created);

  }

  async updateAggregate(
    flight: Flight,
  ): Promise<Flight> {

    const updated = await prisma.vol.update({

      where: {

        id_vol: BigInt(flight.id),

      },

      data: {

        compagnie_vol: flight.airline,

        lieu_depart_vol: flight.departureLocation,

        destination_vol: flight.destination,

        date_aller_vol: flight.departureDate,

        heure_depart_aller_vol: flight.departureTime,

        heure_arrivee_aller_vol: flight.arrivalTime,

        date_retour_vol: flight.returnDate,

        heure_depart_retour_vol: flight.returnDepartureTime,

        heure_arrivee_retour_vol: flight.returnArrivalTime,

        num_vol: flight.flightNumber,

      }

    });

    return FlightMapper.toEntity(updated);

  }

  async delete(
    id: number
  ): Promise<void> {

    await prisma.vol.update({

      where: {

        id_vol: BigInt(id),

      },

      data: {

        statut_vol: "ARCHIVED",

      },

    });

  }

}
