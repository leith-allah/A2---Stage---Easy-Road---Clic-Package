
import { prisma }
from "@/server/db/prisma";

export const packageFlightRepository = {

  async addFlightToPackage(
      packageId: number,
      flightId: number
  ) {

      const lastFlight = await prisma.possede.findFirst({

          where: {
              id_pack: BigInt(packageId),
          },

          orderBy: {
              ordre: "desc",
          },

      });

      return prisma.possede.create({

          data: {

              id_pack: BigInt(packageId),

              id_vol: BigInt(flightId),

              ordre: lastFlight
                  ? lastFlight.ordre + 1
                  : 1,

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
