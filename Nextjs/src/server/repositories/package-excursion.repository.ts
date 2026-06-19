
import { prisma }
from "@/server/db/prisma";

export const packageExcursionRepository = {

  addExcursionToPackage(
    packageId: number,
    excursionId: number
  ) {

    return prisma.propose.create({

      data: {

        id_pack:
          BigInt(packageId),

        id_exc:
          BigInt(excursionId),

      },

    });

  },

  removeExcursionFromPackage(
    packageId: number,
    excursionId: number
  ) {

    return prisma.propose.delete({

      where: {

        id_exc_id_pack: {

          id_exc:
            BigInt(excursionId),

          id_pack:
            BigInt(packageId),

        },

      },

    });

  },

  getExcursionsByPackage(
    packageId: number
  ) {

    return prisma.propose.findMany({

      where: {

        id_pack:
          BigInt(packageId),

      },

      include: {

        excursion: true,

      },

    });

  },

};
