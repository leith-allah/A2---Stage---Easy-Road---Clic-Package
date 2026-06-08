
import { prisma }
from "@/server/db/prisma";

export const notificationRepository = {

  findAll() {

    return prisma.demande_rechargement.findMany({

      orderBy: {
        date_heure_demande_recharge: "desc",
      },

    });

  },

  findById(
    id: number
  ) {

    return prisma.demande_rechargement.findUnique({

      where: {
        id_demande_recharge:
          BigInt(id),
      },

    });

  },

  create(data: {

    userId: number;

    status: string;

    amount: number;

    comment?: string;

  }) {

    return prisma.demande_rechargement.create({

      data: {

        montant_demande_recharge:
          data.amount,

        statut_demande_recharge:
          data.status,

        comment_demande_recharge:
          data.comment,

        date_heure_demande_recharge:
          new Date(),

        id_user:
          BigInt(data.userId),

      },

    });

  },

  update(
    id: number,
    data: {

      status?: string;

      comment?: string;

    }
  ) {

    return prisma.demande_rechargement.update({

      where: {

        id_demande_recharge:
          BigInt(id),

      },

      data: {

        ...(data.status && {

          statut_demande_recharge:
            data.status,

        }),

        ...(data.comment && {

          comment_demande_recharge:
            data.comment,

        }),

      },

    });

  },

  delete(
    id: number
  ) {

    return prisma.demande_rechargement.delete({

      where: {

        id_demande_recharge:
          BigInt(id),

      },

    });

  },

};
