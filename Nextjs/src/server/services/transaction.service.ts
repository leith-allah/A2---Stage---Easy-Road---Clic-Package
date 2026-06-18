
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

    const userId =
      await getCurrentUserId();

    const wallet =
      await walletRepository.findByUserId(
        userId
      );

    if (!wallet) {

      throw new Error(
        "Wallet not found"
      );

    }

    const transactions =
      await transactionRepository.findByWalletId(
        Number(wallet.id_prtfl)
      );

    return transactions.map(
      (transaction) =>
        TransactionMapper.toDto(
          TransactionMapper.fromPrisma(
            transaction
          )
        )
    );

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
