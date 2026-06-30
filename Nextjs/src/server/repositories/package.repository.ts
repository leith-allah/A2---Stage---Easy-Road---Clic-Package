
import { prisma } from "@/server/db/prisma";
import { PACKAGE_STATUS } from "@/server/constants/package-status";

export const packageRepository = {

  getPrisma() {
    return prisma;
  },

  async findAll() {
    return prisma.package_voyage.findMany({
      where: {
        statut_pack: {
          not: PACKAGE_STATUS.ARCHIVED,
        },
      },
      orderBy: {
        id_pack: "desc",
      },
    });
  },

  async findArchived() {
    return prisma.package_voyage.findMany({
      where: {
        statut_pack: PACKAGE_STATUS.ARCHIVED,
      },
      orderBy: {
        id_pack: "desc",
      },
    });
  },

  async findFiltered(filters: {
    country?: string;
    destination?: string;
    status?: string;
  }) {
    return prisma.package_voyage.findMany({
      where: {

        statut_pack: {
          not: PACKAGE_STATUS.ARCHIVED,
        },

        ...(filters.country && {
          pays_pack: filters.country,
        }),

        ...(filters.destination && {
          destination_pack: filters.destination,
        }),

        ...(filters.status && {
          statut_pack: filters.status,
        }),
      },
    });
  },

  async findById(id: number) {
    return prisma.package_voyage.findFirst({
      where: {
        id_pack: BigInt(id),
        statut_pack: {
          not: PACKAGE_STATUS.ARCHIVED,
        },
      },
    });
  },

  async findByIdIncludingArchived(id: number) {
    return prisma.package_voyage.findUnique({
      where: {
        id_pack: BigInt(id),
      },
    });
  },

  async create(data: any) {
    return prisma.package_voyage.create({
      data,
    });
  },

  async update(id: number, data: any) {
    return prisma.package_voyage.update({
      where: {
        id_pack: BigInt(id),
      },
      data,
    });
  },

  async delete(id: number) {
    return prisma.package_voyage.update({
      where: {
        id_pack: BigInt(id),
      },
      data: {
        statut_pack: PACKAGE_STATUS.ARCHIVED,
      },
    });
  },

};
