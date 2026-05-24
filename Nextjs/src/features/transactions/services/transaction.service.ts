
import {
  Transaction,
} from "../types/transaction.types";

export let mockTransactions:
  Transaction[] = [
  {
    id: 1,

    type: "TOP_UP",

    amount: 300000,

    description:
      "Recharge portefeuille",

    createdAt: "2026-05-20",
  },
];

export async function
getTransactions() {
  return mockTransactions;
}

type CreateTransactionData = {
  type: Transaction["type"];

  amount: number;

  description: string;
};

export async function
createTransaction(
  data: CreateTransactionData
) {

  const transaction: Transaction = {
    id: Date.now(),

    type: data.type,

    amount: data.amount,

    description:
      data.description,

    createdAt:
      new Date().toISOString(),
  };

  mockTransactions.unshift(
    transaction
  );

  return transaction;
}
