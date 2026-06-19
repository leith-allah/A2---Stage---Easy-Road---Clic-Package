
import { prisma }
from "@/server/db/prisma";

export const packageHotelRepository = {

  addHotelToPackage(
    packageId: number,
    hotelId: number
  ) {

    return prisma.heberge.create({

      data: {

        id_pack:
          BigInt(packageId),

        id_hot:
          BigInt(hotelId),

      },

    });

  },

  removeHotelFromPackage(
    packageId: number,
    hotelId: number
  ) {

    return prisma.heberge.delete({

      where: {

        id_hot_id_pack: {

          id_hot:
            BigInt(hotelId),

          id_pack:
            BigInt(packageId),

        },

      },

    });

  },

  getHotelsByPackage(
    packageId: number
  ) {

    return prisma.heberge.findMany({

      where: {

        id_pack:
          BigInt(packageId),

      },

      include: {

        hotel: true,

      },

    });

  },

};
