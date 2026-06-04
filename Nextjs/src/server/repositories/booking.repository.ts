
import { prisma }
from "@/server/db/prisma";

export const bookingRepository = {

  async findAll() {

    return prisma.achat_package.findMany({
      orderBy: {
        id_achat_pack: "desc",
      },
    });
  },

  async findById(
    id: number
  ) {

    return prisma.achat_package.findUnique({
      where: {
        id_achat_pack:
          BigInt(id),
      },
    });
  },

  async create(
    data: any
  ) {

    return prisma.achat_package.create({
      data,
    });
  },

  async update(
    id: number,
    data: any
  ) {

    return prisma.achat_package.update({
      where: {
        id_achat_pack:
          BigInt(id),
      },
      data,
    });
  },

  async delete(
    id: number
  ) {

    return prisma.achat_package.delete({
      where: {
        id_achat_pack:
          BigInt(id),
      },
    });
  },
};
