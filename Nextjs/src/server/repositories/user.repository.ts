
import { prisma } from "@/server/db/prisma";

import { Prisma } from "@prisma/client";

import { USER_STATUS } from "@/server/constants/user-status";


export const userRepository = {

  findAll() {

    return prisma.utilisateur.findMany({

      where: {
        NOT: {
          statut_user: USER_STATUS.DELETED,
        },
      },

      include: {
        role: true,
      },
    });
  },

  findById(
    id: number
  ) {

    return prisma.utilisateur.findFirst({

      where: {

        id_user: BigInt(id),

        NOT: {
          statut_user: USER_STATUS.DELETED,
        },

      },

      include: {
        role: true,
      },
    });
  },

  findByEmail(email: string) {

    return prisma.utilisateur.findFirst({

      where: {

        email_pro_user: email,

        NOT: {
          statut_user: USER_STATUS.DELETED,
        },

      },

      include: {
        role: true,
      },
    });
  },

  create(data: Prisma.utilisateurCreateInput) {
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
        id_user:
          BigInt(id),
      },

      data,

    });

  },

  delete(id: number) {

    return prisma.utilisateur.update({

      where: {
        id_user: BigInt(id),
      },

      data: {
        statut_user: USER_STATUS.DELETED,
      },

    });
  },

  async softDelete(id: number) {

      return prisma.utilisateur.update({

          where: {

              id_user: BigInt(id),

          },

          data: {

              statut_user: USER_STATUS.DELETED,

          },

      });

  },

};
