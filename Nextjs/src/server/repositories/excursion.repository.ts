
import { prisma }
from "@/server/db/prisma";

export const excursionRepository = {

  findAll() {

    return prisma.excursion.findMany({

      orderBy: {
        id_exc: "desc",
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.excursion.findUnique({

      where: {
        id_exc: BigInt(id),
      },

    });

  },

  create(data: {

    nom_exc: string;

    lieu_exc: string;

    description_exc: string;

  }) {

    return prisma.excursion.create({

      data: {

        nom_exc:
          data.nom_exc,

        lieu_exc:
          data.lieu_exc,

        description_exc:
          data.description_exc,

      },

    });

  },

  update(
    id: number,
    data: {

      nom_exc?: string;

      lieu_exc?: string;

      description_exc?: string;

    }
  ) {

    return prisma.excursion.update({

      where: {
        id_exc: BigInt(id),
      },

      data: {

        ...(data.nom_exc && {
          nom_exc: data.nom_exc,
        }),

        ...(data.lieu_exc && {
          lieu_exc: data.lieu_exc,
        }),

        ...(data.description_exc && {
          description_exc:
            data.description_exc,
        }),

      },

    });

  },

  delete(
    id: number
  ) {

    return prisma.excursion.delete({

      where: {
        id_exc: BigInt(id),
      },

    });

  },

};
