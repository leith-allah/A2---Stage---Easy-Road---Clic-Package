
import { prisma } from "@/server/db/prisma";

export const transportRepository = {
  findAll() {
    return prisma.transport.findMany({
      orderBy: {
        id_transp: "asc",
      },
    });
  },

  findById(id: number) {
    return prisma.transport.findUnique({
      where: {
        id_transp: BigInt(id),
      },
    });
  },

  create(data: {
    route: string;
    company?: string;
  }) {
    return prisma.transport.create({
      data: {
        trajet_transp: data.route,
        societe_transp: data.company,
      },
    });
  },

  update(
    id: number,
    data: {
      route?: string;
      company?: string;
    }
  ) {
    return prisma.transport.update({
      where: {
        id_transp: BigInt(id),
      },

      data: {
        ...(data.route && {
          trajet_transp: data.route,
        }),

        ...(data.company !== undefined && {
          societe_transp: data.company,
        }),
      },
    });
  },

  delete(id: number) {
    return prisma.transport.delete({
      where: {
        id_transp: BigInt(id),
      },
    });
  },
};
