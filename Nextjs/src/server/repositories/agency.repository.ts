
import { prisma }
from "@/server/db/prisma";

export const agencyRepository = {

  findAll() {

    return prisma.agence.findMany({

      orderBy: {
        id_agence: "asc",
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.agence.findUnique({

      where: {
        id_agence: BigInt(id),
      },

    });

  },

  create(data: {

    mle_agence: string;

    nom_agence: string;

    dc_agence: Date;

    sj_agence: string;

  }) {

    return prisma.agence.create({

      data,

    });

  },

  update(
    id: number,
    data: {

      mle_agence?: string;

      nom_agence?: string;

      dc_agence?: Date;

      sj_agence?: string;

    }
  ) {

    return prisma.agence.update({

      where: {
        id_agence: BigInt(id),
      },

      data,

    });

  },

  delete(
    id: number
  ) {

    return prisma.agence.delete({

      where: {
        id_agence: BigInt(id),
      },

    });

  },

};
