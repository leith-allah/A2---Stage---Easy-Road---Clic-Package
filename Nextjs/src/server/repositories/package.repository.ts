
import { prisma } from "@/server/db/prisma";

export const packageRepository = {

  async findAll() {

    return prisma.package_voyage.findMany({
      orderBy: {
        id_pack: "desc",
      },
    });
  },

  async findById(
    id: number
  ) {

    return prisma.package_voyage.findUnique({
      where: {
        id_pack: BigInt(id),
      },
    });
  },

};
