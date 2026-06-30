
import { prisma } from "@/server/db/prisma";

export const achatPackageRepository = {
  
  create(data: {
    ref_achat_pack: string;
    nb_voyageurs: number;
    classe_vol_achat_pack: string;
    type_chambre_achat_pack: string;
    pension_achat_pack: string;
    prix_achat_pack: number;
    remise_achat_pack?: number;
    total_achat_pack: number;
    statut_achat_pack: string;
    id_pack: bigint;
    id_user: bigint;
    id_transac?: bigint;
  }) {
    return prisma.achat_package.create({
      data: {
        ...data,
        date_heure_achat_pack: new Date(),
      },
    });
  },

  findById(id: bigint) {
    return prisma.achat_package.findUnique({
      where: {
        id_achat_pack: id,
      },
      include: {
        package_voyage: true,
        utilisateur: true,
        transactions: true,
      },
    });
  },

  findByUser(id_user: bigint) {

    return prisma.achat_package.findMany({

      where: {
        id_user,
      },

      include: {
        package_voyage: true,
      },

      orderBy: {
        date_heure_achat_pack: "desc",
      },
    });
  },

  findAll() {

    return prisma.achat_package.findMany({

      include: {
        package_voyage: true,
      },

      orderBy: {
        date_heure_achat_pack: "desc",
      },
    });
  },

  updateStatus(
    id_achat_pack: bigint,
    statut_achat_pack: string
  ) {
    return prisma.achat_package.update({
      where: {
        id_achat_pack,
      },
      data: {
        statut_achat_pack,
      },
    });
  },
};
