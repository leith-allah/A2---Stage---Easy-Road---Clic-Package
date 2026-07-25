
import crypto from "crypto";

import { achatPackageRepository }
from "@/server/repositories/achat-package.repository";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

import { walletRepository }
from "@/server/repositories/wallet.repository";

import { getCurrentUserId }
from "@/server/auth/session";

import { PACKAGE_STATUS }
from "@/server/constants/package-status";

import { TRANSACTION_STATUS }
from "@/server/constants/transaction-status";

import { TRANSACTION_TYPE }
from "@/server/constants/transaction-type";

import { CreateAchatPackageDto }
from "@/server/dto/achat-package/create-achat-package.dto";

import { AchatPackageMapper }
from "@/server/mappers/achat-package.mapper";

import { pricingService }
from "@/server/services/pricing.service";

import { PURCHASE_STATUS } 
from "@/server/constants/purchase-status"

import { getCurrentUser }
from "@/server/middlewares/auth.middleware";

import { prisma }
from "@/server/db/prisma";


const packageRepository =
    new PrismaPackageRepository();

export const achatPackageService = {

  async createPurchase(
    dto: CreateAchatPackageDto
  ) {

    const userId =
      await getCurrentUserId();

    const packageData =
      await packageRepository.findById(
        dto.packageId
      );

console.log(packageData);

    if (!packageData) {

      throw new Error(
        "Package introuvable"
      );

    }

    if (!packageData.isPublished()) {

      throw new Error(
        "Package non disponible"
      );

    }

    if (

      packageData.getAvailableStock() <
      dto.nbVoyageurs

    ) {

      throw new Error(
        "Pas assez de places disponibles"
      );

    }

    const wallet =
      await walletRepository.findByUserId(
        userId
      );

    if (!wallet) {

      throw new Error(
        "Portefeuille introuvable"
      );

    }

    const ownerWallet =
      await walletRepository.findByUserId(
        packageData.ownerId
      );

    if (!ownerWallet) {

      throw new Error(
        "Portefeuille propriétaire introuvable"
      );

    }

console.log({
    dto,

    defaultFlight: packageData.defaultFlightClass,
    defaultRoom: packageData.defaultRoomType,
    defaultBoard: packageData.defaultBoardType,

    supplements: packageData.supplements,
});

    const totalPrice =

      pricingService.calculatePackagePrice(

        packageData,

        {

          nbVoyageurs:
            dto.nbVoyageurs,

          classeVol:
            dto.classeVol,

          typeChambre:
            dto.typeChambre,

          pension:
            dto.pension,

        }

      );

console.log("===== CALCUL PRIX =====");

console.log({
    basePrice: packageData.basePrice,
    supplements: packageData.supplements,
    classeVol: dto.classeVol,
    typeChambre: dto.typeChambre,
    pension: dto.pension,
    nbVoyageurs: dto.nbVoyageurs,
    totalPrice,
});

    const currentBalance =
      Number(
        wallet.solde_total_prtfl
      );

    if (
      currentBalance <
      totalPrice
    ) {

      throw new Error(
        "Solde insuffisant"
      );

    }

    const newBuyerBalance =
      currentBalance -
      totalPrice;

    const newOwnerBalance =
      Number(
        ownerWallet.solde_total_prtfl
      ) + totalPrice;

console.log({
    currentBalance,
    totalPrice,
    newBuyerBalance,
    newOwnerBalance
});


    const purchase =
    await prisma.$transaction(

      async (tx) => {

        await tx.portefeuille.update({

          where: {
            id_prtfl: wallet.id_prtfl,
          },

          data: {

            solde_total_prtfl:
              newBuyerBalance,

            derniere_maj_prtfl:
              new Date(),
          },
        });

        await tx.portefeuille.update({

          where: {
            id_prtfl:
              ownerWallet.id_prtfl,
          },

          data: {

            solde_total_prtfl:
              newOwnerBalance,

            derniere_maj_prtfl:
              new Date(),
          },
        });

        const transaction =

          await tx.transactions.create({

            data: {

              ref_transac:
                crypto.randomUUID(),

              type_transac:
                TRANSACTION_TYPE.PACKAGE_PURCHASE,

              statut_transac:
                TRANSACTION_STATUS.SUCCESS,

              montant_transac:
                totalPrice,

              date_heure_transac:
                new Date(),

              id_portefeuille_source:
                wallet.id_prtfl,

              id_portefeuille_dest:
                ownerWallet.id_prtfl,
            },
          });

        const purchase =

          await tx.achat_package.create({

            data: {

              ref_achat_pack:
                crypto.randomUUID(),

              nb_voyageurs:
                dto.nbVoyageurs,

              classe_vol_achat_pack:
                dto.classeVol,

              type_chambre_achat_pack:
                dto.typeChambre,

              pension_achat_pack:
                dto.pension,

              prix_achat_pack:
                totalPrice,

              remise_achat_pack:
                0,

              total_achat_pack:
                totalPrice,

              statut_achat_pack:
                PURCHASE_STATUS.CONFIRMED,

              id_pack:
                BigInt(packageData.id),

              id_user:
                BigInt(userId),

              id_transac:
                transaction.id_transac,

              date_heure_achat_pack:
                new Date(),

            },

            include: {

              package_voyage: true,

              utilisateur: true,

              transactions: true,

            },

          });

        const newStock = Math.max(
          0,
          packageData.getAvailableStock() - dto.nbVoyageurs
        );

        await tx.package_voyage.update({

          where: {
            id_pack: BigInt(packageData.id),
          },

          data: {

            stock_dispo_pack: newStock,

            // Si le stock tombe à 0, le package est archivé
            ...(newStock === 0 && {
              statut_pack: PACKAGE_STATUS.ARCHIVED,
            }),

          },

        });

        return purchase;
      }
    );

    return AchatPackageMapper.toDto(
      AchatPackageMapper.fromPrisma(
        purchase
      )
    );
    },

  async getMyPurchases() {

    const userId =
      await getCurrentUserId();

    const purchases =
      await achatPackageRepository.findByUser(
        BigInt(userId)
      );

    return purchases.map(
      purchase =>
        AchatPackageMapper.toDto(
          AchatPackageMapper.fromPrisma(
            purchase
          )
        )
    );
  },

  async getPurchaseById(
    id: number
  ) {

    const currentUserId =
      await getCurrentUserId();

    const purchase =

      await achatPackageRepository.findById(
        BigInt(id)
      );

    if (!purchase) {

      throw new Error(
        "Achat introuvable"
      );

    }

    const user =
      await getCurrentUser();

    const adminRoles = [

      "OWNER",
      "SUPER_ADMIN",
      "ADMIN",

    ];

    const isAdmin =

      user &&
      adminRoles.includes(
        user.role
      );

    if (

      !isAdmin &&

      Number(
        purchase.id_user
      ) !== currentUserId

    ) {

      throw new Error(
        "Accès refusé"
      );

    }

    return AchatPackageMapper.toDto(
      AchatPackageMapper.fromPrisma(
        purchase
      )
    );

  },

  async getAllPurchases() {

    const purchases =
      await achatPackageRepository.findAll();

    return purchases.map(
      purchase =>
        AchatPackageMapper.toDto(
          AchatPackageMapper.fromPrisma(
            purchase
          )
        )
    );
  },

  async cancelPurchase(
    purchaseId: number
  ) {

    const currentUserId =
      await getCurrentUserId();

    const purchase =

      await achatPackageRepository.findById(
        BigInt(purchaseId)
      );

    if (!purchase) {

      throw new Error(
        "Achat introuvable"
      );

    }

    if (

      Number(
        purchase.id_user
      ) !== currentUserId

    ) {

      throw new Error(
        "Accès refusé"
      );

    }

    if (

      purchase.statut_achat_pack ===
      PURCHASE_STATUS.CANCELLED

    ) {

      throw new Error(
        "Achat déjà annulé"
      );

    }

    const buyerWallet =

      await walletRepository.findByUserId(
        currentUserId
      );

    if (!buyerWallet) {

      throw new Error(
        "Portefeuille acheteur introuvable"
      );

    }

    const packageData =

      await packageRepository.findById(
        Number(
          purchase.id_pack
        )
      );

    if (!packageData) {

      throw new Error(
        "Package introuvable"
      );

    }

    const ownerWallet =
        await walletRepository.findByUserId(
            packageData.ownerId
        );

    if (!ownerWallet) {

      throw new Error(
        "Portefeuille propriétaire introuvable"
      );

    }

    const refundAmount =

      Number(
        purchase.total_achat_pack
      );

    await prisma.$transaction(

      async (tx) => {

        await tx.portefeuille.update({

          where: {
            id_prtfl:
              buyerWallet.id_prtfl,
          },

          data: {

            solde_total_prtfl:

              Number(
                buyerWallet.solde_total_prtfl
              ) +

              refundAmount,

            derniere_maj_prtfl:
              new Date(),

          },

        });

        await tx.portefeuille.update({

          where: {
            id_prtfl:
              ownerWallet.id_prtfl,
          },

          data: {

            solde_total_prtfl:

              Number(
                ownerWallet.solde_total_prtfl
              ) -

              refundAmount,

            derniere_maj_prtfl:
              new Date(),

          },

        });

        await tx.transactions.create({

          data: {

            ref_transac:
              crypto.randomUUID(),

            type_transac:
              TRANSACTION_TYPE.REFUND,

            statut_transac:
              TRANSACTION_STATUS.SUCCESS,

            montant_transac:
              refundAmount,

            date_heure_transac:
              new Date(),

            id_portefeuille_source:
              ownerWallet.id_prtfl,

            id_portefeuille_dest:
              buyerWallet.id_prtfl,

          },

        });

        await tx.achat_package.update({

          where: {

            id_achat_pack:

              purchase.id_achat_pack,

          },

          data: {

            statut_achat_pack:

              PURCHASE_STATUS.CANCELLED,

          },

        });

        await tx.package_voyage.update({

          where: {

            id_pack:
              BigInt(packageData.id),

          },

          data: {

            stock_dispo_pack: {
                increment: purchase.nb_voyageurs,
            }

          },

        });

      }

    );

    return {

      success: true,

      refunded:
        refundAmount,
    };
  }
};
