
import crypto from "crypto";

import { prisma }
from "@/server/db/prisma";

import { rechargeRequestRepository }
from "@/server/repositories/recharge-request.repository";

import { NotFoundException }
from "@/server/utils/api-error";

import { walletRepository }
from "@/server/repositories/wallet.repository";

import { transactionRepository }
from "@/server/repositories/transaction.repository";

import { TRANSACTION_STATUS }
from "@/server/constants/transaction-status";

import { TRANSACTION_TYPE }
from "@/server/constants/transaction-type";

import { RECHARGE_REQUEST_STATUS }
from "@/server/constants/recharge-request-status";

import { OWNER_WALLET_ID }
from "@/server/constants/business-wallet";

import { getCurrentUserId }
from "@/server/auth/session";


export const rechargeRequestService = {

  async getAllRequests() {

    return rechargeRequestRepository.findAll();

  },

  async getRequestById(
    id: number
  ) {

    const request =
      await rechargeRequestRepository.findById(
        id
      );

    if (!request) {

      throw new NotFoundException(
        "Demande introuvable"
      );

    }

    return request;

  },

  async getMyRequests() {

    const userId =
      await getCurrentUserId();

    return rechargeRequestRepository.findByUserId(
      userId
    );

  },

  async createRequest(
    data: {

      userId: number;

      amount: number;

      comment?: string;

    }
  ) {

    return rechargeRequestRepository.create(
      data
    );

  },

  async updateRequest(
    id: number,
    data: {

      status?: string;

      comment?: string;

    }
  ) {

    await this.getRequestById(
      id
    );

    return rechargeRequestRepository.update(
      id,
      data
    );

  },

  async deleteRequest(
    id: number
  ) {

    await this.getRequestById(
      id
    );

    return rechargeRequestRepository.delete(
      id
    );

  },

  async approveRequest(
    id: number
  ) {

    const request =
      await this.getRequestById(
        id
      );

    if (
      request.statut_demande_recharge !==
      RECHARGE_REQUEST_STATUS.PENDING
    ) {

      throw new Error(
        "Request already processed"
      );

    }

    const ownerWallet =
      await walletRepository.findById(
        OWNER_WALLET_ID
      );

    if (!ownerWallet) {

      throw new Error(
        "Business wallet not found"
      );

    }

    const clientWallet =
      await walletRepository.findByUserId(
        Number(request.id_user)
      );

    if (!clientWallet) {

      throw new Error(
        "Client wallet not found"
      );

    }

    const amount =
      Number(
        request.montant_demande_recharge
      );

    const ownerBalance =
      Number(
        ownerWallet.solde_total_prtfl
      );

    if (
      ownerBalance < amount
    ) {

      throw new Error(
        "Business wallet balance insufficient"
      );

    }

    const newOwnerBalance =
      ownerBalance - amount;

    const newClientBalance =
      Number(
        clientWallet.solde_total_prtfl
      ) + amount;

    const result =
      await prisma.$transaction(

        async (tx) => {

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

          await tx.portefeuille.update({

            where: {
              id_prtfl:
                clientWallet.id_prtfl,
            },

            data: {

              solde_total_prtfl:
                newClientBalance,

              derniere_maj_prtfl:
                new Date(),

            },

          });

          await tx.transactions.create({

            data: {

              ref_transac:
                crypto.randomUUID(),

              type_transac:
                TRANSACTION_TYPE.TOPUP,

              statut_transac:
                TRANSACTION_STATUS.SUCCESS,

              montant_transac:
                amount,

              date_heure_transac:
                new Date(),

              id_portefeuille_source:
                ownerWallet.id_prtfl,

              id_portefeuille_dest:
                clientWallet.id_prtfl,

            },

          });

          return tx.demande_rechargement.update({

            where: {

              id_demande_recharge:
                request.id_demande_recharge,

            },

            data: {

              statut_demande_recharge:
                RECHARGE_REQUEST_STATUS.APPROVED,

            },

          });

        }

      );

    return result;

  },

  async rejectRequest(
    id: number
  ) {

    const request =
      await this.getRequestById(
        id
      );

    if (
      request.statut_demande_recharge !==
      RECHARGE_REQUEST_STATUS.PENDING
    ) {

      throw new Error(
        "Request already processed"
      );

    }

    return rechargeRequestRepository.update(

      id,

      {

        status:
          RECHARGE_REQUEST_STATUS.REJECTED,

      }

    );

  }

};
