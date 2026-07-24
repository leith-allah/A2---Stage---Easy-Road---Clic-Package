
import { prisma } from "@/server/db/prisma";

import { Airport } from "@/server/entities/airport.entity";

import { AirportRepository } from "../interfaces/airport.repository.interface";

import { AirportMapper } from "@/server/mappers/airport.mapper";

import { AirportPersistence } from "@/server/persistence/airport.persistence";

export class PrismaAirportRepository implements AirportRepository {

  async findAll(): Promise<Airport[]> {

    const airports: AirportPersistence[] =
      await prisma.aeroport.findMany({

        include: {

          ville: {

            include: {

              pays: true,

            },

          },

        },

        orderBy: {

          nom_aeroport: "asc",

        },

      });

    return AirportMapper.toEntities(
      airports,
    );

  }

  async findById(
    id: number,
  ): Promise<Airport | null> {

    const airport =
      await prisma.aeroport.findUnique({

        where: {

          id_aeroport: id,

        },

        include: {

          ville: {

            include: {

              pays: true,

            },

          },

        },

      });

    if (!airport) {

      return null;

    }

    return AirportMapper.toEntity(
      airport,
    );

  }

}
