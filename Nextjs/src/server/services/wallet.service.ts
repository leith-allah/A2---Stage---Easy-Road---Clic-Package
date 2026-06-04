
import { walletRepository }
from "@/server/repositories/wallet.repository";

export const walletService = {

  async getBalance() {

    const wallet =
      walletRepository.findByUserId(
        1
      );

    return wallet;
  },

  async topup(
    amount: number
  ) {

    const wallet =
      walletRepository.findByUserId(
        1
      );

    if (!wallet) {
      throw new Error(
        "Wallet introuvable"
      );
    }

    return walletRepository.updateBalance(
      1,
      wallet.balance + amount
    );
  },

  async transfer(
    recipientId: number,
    amount: number
  ) {

    const sender =
      walletRepository.findByUserId(
        1
      );

    const recipient =
      walletRepository.findByUserId(
        recipientId
      );

    if (
      !sender ||
      !recipient
    ) {
      throw new Error(
        "Wallet introuvable"
      );
    }

    if (
      sender.balance < amount
    ) {
      throw new Error(
        "Fonds insuffisants"
      );
    }

    walletRepository.updateBalance(
      sender.userId,
      sender.balance - amount
    );

    walletRepository.updateBalance(
      recipient.userId,
      recipient.balance + amount
    );

    return {
      success: true,
    };
  },
};
