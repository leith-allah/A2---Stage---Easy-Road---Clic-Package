
import { prisma }
from "@/server/db/prisma";


export const walletRepository = {

  findAll() {

    return prisma.portefeuille.findMany({
      orderBy: {
        id_prtfl: "asc",
      },
    });
  },


  findById(
    id: number
  ) {

    return prisma.portefeuille.findUnique({
      where: {
        id_prtfl: BigInt(id),
      },
    });
  },


  findByUserId(
    userId: number
  ) {

    return prisma.portefeuille.findUnique({
      where: {
        id_user: BigInt(userId),
      },
    });
  },


  create(
    userId: number
  ) {

    return prisma.portefeuille.create({
      data: {
        num_prtfl:
          crypto.randomUUID(),

        solde_total_prtfl: 0,

        derniere_maj_prtfl:
          new Date(),

        id_user:
          BigInt(userId),
      },
    });
  },


  updateBalance(
    id: number,
    balance: number
  ) {

    return prisma.portefeuille.update({
      where: {
        id_prtfl: BigInt(id),
      },

      data: {

        solde_total_prtfl:
          balance,

        derniere_maj_prtfl:
          new Date(),
      },
    });
  },


  delete(id: number) {
    throw new Error(
      "La suppression des portefeuilles est interdite"
    );
  },


  async transferFunds(
  senderWalletId: number,
  recipientWalletId: number,
  senderNewBalance: number,
  recipientNewBalance: number
) {

  return prisma.$transaction([

    prisma.portefeuille.update({

      where: {
        id_prtfl: BigInt(senderWalletId),
      },

      data: {

        solde_total_prtfl:
          senderNewBalance,

        derniere_maj_prtfl:
          new Date(),
      },
    }),

    prisma.portefeuille.update({

      where: {
        id_prtfl: BigInt(recipientWalletId),
      },

      data: {

        solde_total_prtfl:
          recipientNewBalance,

        derniere_maj_prtfl:
          new Date(),
      },
    }),
  ]);
},


  async secureTransfer(
    senderWalletId: number,
    recipientWalletId: number,
    amount: number
  ) {

    return prisma.$transaction(
      async (tx) => {

        const sender =
          await tx.portefeuille.findUnique({
            where: {
              id_prtfl: BigInt(senderWalletId),
            },
          });

        const recipient =
          await tx.portefeuille.findUnique({
            where: {
              id_prtfl: BigInt(recipientWalletId),
            },
          });

        if (!sender || !recipient) {
          throw new Error("Wallet introuvable");
        }

        const senderBalance =
          Number(sender.solde_total_prtfl);

        if (senderBalance < amount) {
          throw new Error("Solde insuffisant");
        }

        await tx.portefeuille.update({

          where: {
            id_prtfl: sender.id_prtfl,
          },

          data: {

            solde_total_prtfl:
              senderBalance - amount,

            derniere_maj_prtfl:
              new Date(),

          },

        });

        await tx.portefeuille.update({

          where: {
            id_prtfl: recipient.id_prtfl,
          },

          data: {

            solde_total_prtfl:
              Number(recipient.solde_total_prtfl)
              + amount,

            derniere_maj_prtfl:
              new Date(),

          },

        });

      }
    );

  }

};
