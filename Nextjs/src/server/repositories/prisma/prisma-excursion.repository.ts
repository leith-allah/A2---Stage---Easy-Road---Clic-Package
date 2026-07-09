
import { prisma } from "@/server/db/prisma";

import { Excursion } from "@/server/entities/excursion.entity";

import { ExcursionMapper } from "@/server/mappers/excursion.mapper";

import { ExcursionRepository } from "../interfaces/excursion.repository.interface";

export class PrismaExcursionRepository
implements ExcursionRepository {

  async findAll(): Promise<Excursion[]> {

    const excursions =
      await prisma.excursion.findMany({

        orderBy: {

          nom_exc: "asc",

        },

      });

    return excursions.map(

      ExcursionMapper.toEntity,

    );

  }

  async findById(
    id: number,
  ): Promise<Excursion | null> {

    const excursion =
      await prisma.excursion.findUnique({

        where: {

          id_exc: BigInt(id),

        },

      });

    if (!excursion) {

      return null;

    }

    return ExcursionMapper.toEntity(
      excursion,
    );

  }

  async createAggregate(
    excursion: Excursion,
  ): Promise<Excursion> {

    const created =
      await prisma.excursion.create({

        data: {

          nom_exc: excursion.name,

          lieu_exc: excursion.location,

          description_exc: excursion.description,

        },

      });

    return ExcursionMapper.toEntity(
      created,
    );

  }

  async updateAggregate(
    excursion: Excursion,
  ): Promise<Excursion> {

    const updated =
      await prisma.excursion.update({

        where: {

          id_exc: BigInt(excursion.id),

        },

        data: {

          nom_exc: excursion.name,

          lieu_exc: excursion.location,

          description_exc: excursion.description,

        }

      });

    return ExcursionMapper.toEntity(
      updated,
    );

  }

  async delete(
    id: number,
  ): Promise<void> {

    await prisma.excursion.delete({

      where: {
        id_exc: BigInt(id),
      },

    });

  }

}
