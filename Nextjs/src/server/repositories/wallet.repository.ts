
import { prisma }
from "@/server/db/prisma";

export const walletRepository = {

  findByUserId(
    userId: number
  ) {

    return prisma.portefeuille.findUnique({

      where: {
        id_user: BigInt(userId),
      },

    });
  },

  findById(
    walletId: number
  ) {

    return prisma.portefeuille.findUnique({

      where: {
        id_prtfl: BigInt(walletId),
      },

    });
  },

  updateBalance(

    walletId: number,

    balance: number

  ) {

    return prisma.portefeuille.update({

      where: {
        id_prtfl: BigInt(walletId),
      },

      data: {

        solde_total_prtfl: balance,

        derniere_maj_prtfl:
          new Date(),

      },

    });
  },

};
