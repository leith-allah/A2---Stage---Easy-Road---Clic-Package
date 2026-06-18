
import { prisma }
from "@/server/db/prisma";

import { RECHARGE_REQUEST_STATUS } 
from "@/server/constants/recharge-request-status";


export const rechargeRequestRepository = {

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

    amount: number;

    comment?: string;

  }) {

    return prisma.demande_rechargement.create({

      data: {

        id_user:
          BigInt(data.userId),

        montant_demande_recharge:
          data.amount,

        statut_demande_recharge:
          RECHARGE_REQUEST_STATUS.PENDING,

        comment_demande_recharge:
          data.comment,

        date_heure_demande_recharge:
          new Date(),

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
