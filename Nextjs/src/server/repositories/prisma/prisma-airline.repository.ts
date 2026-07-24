
import { prisma } from "@/server/db/prisma";

import { Airline } from "@/server/entities/airline.entity";

import { AirlineRepository } from "../interfaces/airline.repository.interface";

import { AirlineMapper } from "@/server/mappers/airline.mapper";

import { AirlinePersistence } from "@/server/persistence/airline.persistence";


export class PrismaAirlineRepository implements AirlineRepository {

  async findAll(): Promise<Airline[]> {

    const airlines: AirlinePersistence[] =
      await prisma.compagnie_aerienne.findMany({

        orderBy: {

          nom_compagnie: "asc",

        },

      });

    return AirlineMapper.toEntities(
      airlines,
    );

  }

  async findById(
    id: number,
  ): Promise<Airline | null> {

    const airline =
      await prisma.compagnie_aerienne.findUnique({

        where: {

          id_compagnie: id,

        },

      });

    if (!airline) {

      return null;

    }

    return AirlineMapper.toEntity(
      airline,
    );

  }

}
