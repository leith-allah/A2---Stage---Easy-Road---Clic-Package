
import { prisma }
from "@/server/db/prisma";

export const roleRepository = {

  findAll() {

    return prisma.role.findMany({

      orderBy: {
        nom_role: "asc",
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.role.findUnique({

      where: {
        id_role: BigInt(id),
      },

    });

  },

  create(
    name: string
  ) {

    return prisma.role.create({

      data: {

        nom_role:
          name,

      },

    });

  },

  update(
    id: number,
    name: string
  ) {

    return prisma.role.update({

      where: {
        id_role: BigInt(id),
      },

      data: {

        nom_role:
          name,

      },

    });

  },

  delete(
    id: number
  ) {

    return prisma.role.delete({

      where: {
        id_role: BigInt(id),
      },

    });

  },

};
