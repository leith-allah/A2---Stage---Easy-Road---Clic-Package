
import { prisma }
from "@/server/db/prisma";

export const packageTransportRepository = {

  addTransportToPackage(
    packageId: number,
    transportId: number
  ) {

    return prisma.utilise.create({

      data: {

        id_pack:
          BigInt(packageId),

        id_transp:
          BigInt(transportId),

      },

    });

  },

  removeTransportFromPackage(
    packageId: number,
    transportId: number
  ) {

    return prisma.utilise.delete({

      where: {

        id_transp_id_pack: {

          id_transp:
            BigInt(transportId),

          id_pack:
            BigInt(packageId),

        },

      },

    });

  },

  getTransportsByPackage(
    packageId: number
  ) {

    return prisma.utilise.findMany({

      where: {

        id_pack:
          BigInt(packageId),

      },

      include: {

        transport: true,

      },

    });

  },

};
