
import { prisma } from "@/server/db/prisma";

export const packageRepository = {

  async findAll() {

    return prisma.packageVoyage.findMany({
      orderBy: {
        id: "desc",
      },
    });
  },

  async findById(
    id: number
  ) {

    return prisma.packageVoyage.findUnique({
      where: {
        id,
      },
    });
  },

};
