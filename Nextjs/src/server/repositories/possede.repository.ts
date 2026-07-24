
import { prisma }
from "@/server/db/prisma";

export const possedeRepository = {

  findAll() {

    return prisma.possede.findMany();

  },

  async create(
    id_pack: number,
    id_vol: number
  ) {

    const lastFlight = await prisma.possede.findFirst({

      where: {
        id_pack: BigInt(id_pack),
      },

      orderBy: {
        ordre: "desc",
      },

    });

    return prisma.possede.create({

      data: {

        id_pack: BigInt(id_pack),

        id_vol: BigInt(id_vol),

        ordre: lastFlight
          ? lastFlight.ordre + 1
          : 1,

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
