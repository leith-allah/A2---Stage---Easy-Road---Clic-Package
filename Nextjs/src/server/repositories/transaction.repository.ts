
import { prisma }
from "@/server/db/prisma";


export const transactionRepository = {

  findAll() {

    return prisma.transactions.findMany({

      orderBy: {
        date_heure_transac: "desc",
      },

    });
  },

  findById(
    id: number
  ) {

    return prisma.transactions.findUnique({

      where: {
        id_transac: BigInt(id),
      },

    });
  },

  findByWalletId(
    walletId: number
  ) {

    return prisma.transactions.findMany({

      where: {

        OR: [

          {
            id_portefeuille_source:
              BigInt(walletId),
          },

          {
            id_portefeuille_dest:
              BigInt(walletId),
          },

        ],

      },

      orderBy: {
        date_heure_transac: "desc",
      },

    });

  },

  create(data: {

    sourceWalletId: number;

    destinationWalletId: number;

    amount: number;

    type: string;

    status: string;

  }) {

    return prisma.transactions.create({

      data: {

        ref_transac:
          crypto.randomUUID(),

        type_transac:
          data.type,

        statut_transac:
          data.status,

        montant_transac:
          data.amount,

        date_heure_transac:
          new Date(),

        id_portefeuille_source:
          BigInt(
            data.sourceWalletId
          ),

        id_portefeuille_dest:
          BigInt(
            data.destinationWalletId
          ),

      },

    });
  },

  update(
  id: number,
  data: {
    type?: string;
    status?: string;
  }
) {

  return prisma.transactions.update({

    where: {
      id_transac: BigInt(id),
    },

    data: {

      ...(data.type && {
        type_transac: data.type,
      }),

      ...(data.status && {
        statut_transac: data.status,
      }),

    },

  });

},

delete(
  _: number
) {

  throw new Error(
    "La suppression des transactions est interdite"
  );

}
  
};
