
import { prisma }
  from "@/server/db/prisma";

export const userRepository = {

  findAll() {
    return prisma.user.findMany();
  },

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  create(data: any) {
    return prisma.user.create({
      data,
    });
  },

  update(
    id: number,
    data: any
  ) {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
