
import { prisma }
from "@/server/db/prisma";

export const utiliseRepository = {

  findAll() {

    return prisma.utilise.findMany();

  },

  create(
    id_pack: number,
    id_transp: number
  ) {

    return prisma.utilise.create({

      data: {

        id_pack:
          BigInt(id_pack),

        id_transp:
          BigInt(id_transp),

      },

    });

  },

  delete(
    id_pack: number,
    id_transp: number
  ) {

    return prisma.utilise.delete({

      where: {

        id_transp_id_pack: {

          id_transp:
            BigInt(id_transp),

          id_pack:
            BigInt(id_pack),

        },

      },

    });

  },

};
