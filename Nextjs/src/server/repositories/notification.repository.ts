
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

};
