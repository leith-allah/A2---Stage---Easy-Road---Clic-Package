
import { Wallet } from "@/server/entities/wallet.entity";

export const wallets: Wallet[] = [
  {
    id: 1,
    userId: 1,
    balance: 5000,
    updatedAt: new Date(),
  },

  {
    id: 2,
    userId: 2,
    balance: 1200,
    updatedAt: new Date(),
  },
];
