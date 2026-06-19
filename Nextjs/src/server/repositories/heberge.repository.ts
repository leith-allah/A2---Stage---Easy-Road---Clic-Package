
import { prisma }
from "@/server/db/prisma";

export const hebergeRepository = {

  findAll() {

    return prisma.heberge.findMany();

  },

  create(
    id_pack: number,
    id_hot: number
  ) {

    return prisma.heberge.create({

      data: {

        id_pack:
          BigInt(id_pack),

        id_hot:
          BigInt(id_hot),

      },

    });

  },

  delete(
    id_pack: number,
    id_hot: number
  ) {

    return prisma.heberge.delete({

      where: {

        id_hot_id_pack: {

          id_hot:
            BigInt(id_hot),

          id_pack:
            BigInt(id_pack),

        },

      },

    });

  },

};
