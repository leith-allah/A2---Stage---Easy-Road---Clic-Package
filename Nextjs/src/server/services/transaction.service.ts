
import {
  transactionRepository,
}
from "@/server/repositories/transaction.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const transactionService = {

  async getAllTransactions() {

    return transactionRepository.findAll();
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

    return transaction;
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
  id: number
) {

  await this.getTransactionById(
    id
  );

  return transactionRepository.delete(
    id
  );
},
};
