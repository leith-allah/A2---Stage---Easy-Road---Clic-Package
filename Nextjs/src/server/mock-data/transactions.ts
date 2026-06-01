
import { Transaction } from "@/server/entities/transaction.entity";

export const transactions: Transaction[] = [
  {
    id: 1,
    sourceWalletId: 1,
    destinationWalletId: 2,
    amount: 1000,
    type: "TRANSFER",
    status: "SUCCESS",
    createdAt: new Date(),
  },
];
