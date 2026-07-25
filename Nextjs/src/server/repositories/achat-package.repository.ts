
import { prisma } from "@/server/db/prisma";

// 🔍 Objet d'inclusion complet pour charger toutes les sous-relations du package
const packageRelationsInclude = {
  include: {
    possede: {
      include: {
        vol: {
          include: {
            compagnie_aerienne: true,
            aeroport_vol_id_aeroport_departToaeroport: true,
            aeroport_vol_id_aeroport_arriveeToaeroport: true,
          },
        },
      },
    },
    heberge: {
      include: {
        hotel: true,
      },
    },
    utilise: {
      include: {
        transport: true,
      },
    },
    propose: {
      include: {
        excursion: true,
      },
    },
  },
};

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
        package_voyage: packageRelationsInclude,
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
        package_voyage: packageRelationsInclude,
      },
      orderBy: {
        date_heure_achat_pack: "desc",
      },
    });
  },

  findAll() {
    return prisma.achat_package.findMany({
      include: {
        package_voyage: packageRelationsInclude,
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
