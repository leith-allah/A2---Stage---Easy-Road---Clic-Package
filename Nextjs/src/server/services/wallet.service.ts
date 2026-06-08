
import { walletRepository }
from "@/server/repositories/wallet.repository";

import { getCurrentUserId } from "@/server/auth/session";


export const walletService = {

  async getBalance() {

    const userId =
      await getCurrentUserId();

    const wallet =
      await walletRepository.findByUserId(
        userId
      );

    if (!wallet) {
      throw new Error(
        "Portefeuille introuvable"
      );
    }

    return {
      balance:
        Number(
          wallet.solde_total_prtfl
        ),
    };
  },

  async topup(
    amount: number
  ) {

    const userId =
      await getCurrentUserId();

    const wallet =
      await walletRepository.findByUserId(
        userId
      );

    if (!wallet) {
      throw new Error(
        "Portefeuille introuvable"
      );
    }

    const newBalance =
      Number(
        wallet.solde_total_prtfl
      ) + amount;

    await walletRepository.updateBalance(
      Number(wallet.id_prtfl),
      newBalance
    );

    return {
      success: true,
      balance: newBalance,
    };
  },

  async transfer(
    recipientId: number,
    amount: number
  ) {

    const userId =
      await getCurrentUserId();

    const sender =
      await walletRepository.findByUserId(
        userId
      );

    const recipient =
      await walletRepository.findByUserId(
        recipientId
      );

    if (
      !sender ||
      !recipient
    ) {
      throw new Error(
        "Portefeuille introuvable"
      );
    }

    const senderBalance =
      Number(
        sender.solde_total_prtfl
      );

    if (
      senderBalance < amount
    ) {
      throw new Error(
        "Solde insuffisant"
      );
    }

    const newSenderBalance =
      senderBalance - amount;

    const newRecipientBalance =
      Number(
        recipient.solde_total_prtfl
      ) + amount;

    await walletRepository.transferFunds(

      Number(sender.id_prtfl),

      Number(recipient.id_prtfl),

      newSenderBalance,

      newRecipientBalance

    );

    return {
      success: true,
      balance: newSenderBalance,
    };
  },

  async getAllWallets() {

    return walletRepository.findAll();

  },

  async getWalletById(
    id: number
  ) {

    const wallet =
      await walletRepository.findById(
        id
      );

    if (!wallet) {

      throw new Error(
        "Portefeuille introuvable"
      );

    }

    return wallet;

  },

  async createWallet(
    userId: number
  ) {

    return walletRepository.create(
      userId
    );

  },

  async deleteWallet(
    id: number
  ) {

    await this.getWalletById(
      id
    );

    return walletRepository.delete(
      id
    );

  },

};
