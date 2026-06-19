
import { prisma }
from "@/server/db/prisma";

export const possedeRepository = {

  findAll() {

    return prisma.possede.findMany();

  },

  create(
    id_pack: number,
    id_vol: number
  ) {

    return prisma.possede.create({

      data: {

        id_pack:
          BigInt(id_pack),

        id_vol:
          BigInt(id_vol),

      },

    });

  },

  delete(
    id_pack: number,
    id_vol: number
  ) {

    return prisma.possede.delete({

      where: {

        id_vol_id_pack: {

          id_vol:
            BigInt(id_vol),

          id_pack:
            BigInt(id_pack),

        },

      },

    });

  },

};
