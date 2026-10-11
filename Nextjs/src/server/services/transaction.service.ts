
import { transactionRepository } 
from "@/server/repositories/transaction.repository";

import { NotFoundException }
from "@/server/utils/api-error";

import { TransactionMapper }
from "@/server/mappers/transaction.mapper";

import { getCurrentUserId }
from "@/server/auth/session";

import { walletRepository }
from "@/server/repositories/wallet.repository";


export const transactionService = {

  async getAllTransactions() {

    const transactions =
      await transactionRepository.findAll();

    return transactions.map(
      (transaction) =>
        TransactionMapper.toDto(
          TransactionMapper.fromPrisma(
            transaction
          )
        )
    );
  },

  async getTransactionById(
    id: number
  ) {

    const transaction =
      await transactionRepository.findById(
        id
      );

    if (!transaction) {

      throw new NotFoundException(
        "Transaction introuvable"
      );

    }

    return TransactionMapper.toDto(
      TransactionMapper.fromPrisma(
        transaction
      )
    );
  },

  async getMyTransactions() {
    const userId = await getCurrentUserId();

    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
      throw new Error("Wallet introuvable");
    }

    const userWalletId = wallet.id_prtfl;

    const rawTransactions = await transactionRepository.findByWalletId(
      Number(userWalletId)
    );

    return rawTransactions.map((tx) => {
      // 🎯 Règle infaillible : Si mon portefeuille est le destinataire => CRÉDIT (+), sinon DÉBIT (-)
      const isCredit = tx.id_portefeuille_dest === userWalletId;

      return {
        id: Number(tx.id_transac),
        ref: tx.ref_transac || "-",
        type: tx.type_transac,
        status: tx.statut_transac,
        amount: Number(tx.montant_transac),
        description: tx.description_transac || (isCredit ? "Rechargement / Virement reçu" : "Paiement / Virement envoyé"),
        date: tx.date_heure_transac,
        isCredit: isCredit, // 👈 Booléen exact injecté par le serveur
      };
    });
  },

  async createTransaction(
    data: {

      sourceWalletId: number;

      destinationWalletId: number;

      amount: number;

      type: string;

      status: string;

    }
  ) {

    return transactionRepository.create(
      data
    );
  },

  async updateTransaction(
  id: number,
  data: {
    type?: string;
    status?: string;
  }
) {

  await this.getTransactionById(
    id
  );

  return transactionRepository.update(
    id,
    data
  );
},

async deleteTransaction(
  _: number
) {

  throw new Error(
    "Transaction deletion is forbidden"
  );

}
};
