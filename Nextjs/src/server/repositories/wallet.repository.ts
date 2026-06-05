
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

  updateBalance(
    walletId: bigint,
    balance: number
  ) {

    return prisma.portefeuille.update({
      where: {
        id_prtfl: walletId,
      },

      data: {
        solde_total_prtfl: balance,

        derniere_maj_prtfl:
          new Date(),
      },
    });
  },

};
