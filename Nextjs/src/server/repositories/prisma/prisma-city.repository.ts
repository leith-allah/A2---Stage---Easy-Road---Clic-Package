
import { prisma } from "@/server/db/prisma";

import { City } from "@/server/entities/city.entity";

import { CityRepository } from "../interfaces/city.repository.interface";

import { CityMapper } from "@/server/mappers/city.mapper";

import { CityPersistence } from "@/server/persistence/city.persistence";

export class PrismaCityRepository implements CityRepository {

  async findAll(): Promise<City[]> {

    const cities: CityPersistence[] =
      await prisma.ville.findMany({

        include: {

          pays: true,

        },

        orderBy: {

          nom_ville: "asc",

        },

      });

    return CityMapper.toEntities(
      cities,
    );

  }

  async findById(
    id: number,
  ): Promise<City | null> {

    const city =
      await prisma.ville.findUnique({

        where: {

          id_ville: id,

        },

        include: {

          pays: true,

        },

      });

    if (!city) {

      return null;

    }

    return CityMapper.toEntity(
      city,
    );

  }

}
