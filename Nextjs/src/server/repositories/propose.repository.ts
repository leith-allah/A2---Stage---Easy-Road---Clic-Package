
import { prisma }
from "@/server/db/prisma";

export const proposeRepository = {

  findAll() {

    return prisma.propose.findMany();

  },

  create(
    id_pack: number,
    id_exc: number
  ) {

    return prisma.propose.create({

      data: {

        id_pack:
          BigInt(id_pack),

        id_exc:
          BigInt(id_exc),

      },

    });

  },

  delete(
    id_pack: number,
    id_exc: number
  ) {

    return prisma.propose.delete({

      where: {

        id_exc_id_pack: {

          id_exc:
            BigInt(id_exc),

          id_pack:
            BigInt(id_pack),

        },

      },

    });

  },

};
