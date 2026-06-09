
import { prisma }
  from "@/server/db/prisma";

export const userRepository = {

  findAll() {
    return prisma.utilisateur.findMany();
  },

  findById(id: number) {
    return prisma.utilisateur.findUnique({
      where: {
        id_user: BigInt(id),
      },
    });
  },

  findByEmail(email: string) {

    return prisma.utilisateur.findUnique({

      where: {
        email_pro_user: email,
      },

      include: {
        role: true,
      },

    });

  },

  create(data: any) {
    return prisma.utilisateur.create({
      data,
    });
  },

  update(
    id: number,
    data: any
  ) {
    return prisma.utilisateur.update({
      where: {
        id_user: BigInt(id),
      },
      data,
    });
  },

  delete(id: number) {
    return prisma.utilisateur.delete({
      where: {
        id_user: BigInt(id),
      },
    });
  },
};
