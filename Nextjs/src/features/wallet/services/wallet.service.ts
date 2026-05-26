
import { Wallet } from "@/types/wallet.types";

export const mockWallet: Wallet = {
  id: 1,

  balance: 850000,

  currency: "DZD",

  transactions: [
    {
      id: 1,
      type: "TOP_UP",
      amount: 300000,
      createdAt: "2026-05-20",
      description:
        "Recharge portefeuille",
    },

    {
      id: 2,
      type: "PAYMENT",
      amount: -120000,
      createdAt: "2026-05-22",
      description:
        "Réservation Istanbul Premium",
    },
  ],
};

export async function getWallet() {
  return mockWallet;
}

export async function debitWallet(
  amount: number
) {
  if (mockWallet.balance < amount) {
    throw new Error(
      "Solde insuffisant"
    );
  }

  mockWallet.balance -= amount;

  mockWallet.transactions.unshift({
    id: Date.now(),

    type: "PAYMENT",

    amount: -amount,

    createdAt:
      new Date().toISOString(),

    description:
      "Paiement réservation",
  });

  return mockWallet;
}

export async function topUpWallet(
  amount: number
) {
  mockWallet.balance += amount;

  mockWallet.transactions.unshift({
    id: Date.now(),

    type: "TOP_UP",

    amount,

    createdAt:
      new Date().toISOString(),

    description:
      "Recharge portefeuille",
  });

  return mockWallet;
}
