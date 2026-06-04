
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


  async create(data: any) {

  return prisma.package_voyage.create({
    data,
  });
},

async update(
  id: number,
  data: any
) {

  return prisma.package_voyage.update({
    where: {
      id_pack: BigInt(id),
    },
    data,
  });
},

async delete(
  id: number
) {

  return prisma.package_voyage.delete({
    where: {
      id_pack: BigInt(id),
    },
  });
},
};
