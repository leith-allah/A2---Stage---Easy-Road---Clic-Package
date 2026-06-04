
import { wallets }
from "@/server/mock-data/wallets";

export const walletRepository = {

  findByUserId(
    userId: number
  ) {

    return wallets.find(
      wallet =>
        wallet.userId === userId
    );
  },

  updateBalance(
    userId: number,
    balance: number
  ) {

    const wallet =
      wallets.find(
        wallet =>
          wallet.userId === userId
      );

    if (!wallet) {
      return null;
    }

    wallet.balance =
      balance;

    wallet.updatedAt =
      new Date();

    return wallet;
  },
};
