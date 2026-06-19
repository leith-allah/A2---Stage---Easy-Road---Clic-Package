
import { prisma }
from "@/server/db/prisma";

export const packageFlightRepository = {

  addFlightToPackage(
    packageId: number,
    flightId: number
  ) {

    return prisma.possede.create({

      data: {

        id_pack:
          BigInt(packageId),

        id_vol:
          BigInt(flightId),

      },

    });

  },

  removeFlightFromPackage(
    packageId: number,
    flightId: number
  ) {

    return prisma.possede.delete({

      where: {

        id_vol_id_pack: {

          id_vol:
            BigInt(flightId),

          id_pack:
            BigInt(packageId),

        },

      },

    });

  },

  getFlightsByPackage(
    packageId: number
  ) {

    return prisma.possede.findMany({

      where: {

        id_pack:
          BigInt(packageId),

      },

      include: {

        vol: true,

      },

    });

  },

};
