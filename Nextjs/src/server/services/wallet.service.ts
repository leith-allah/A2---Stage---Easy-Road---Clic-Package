
import { walletRepository }
from "@/server/repositories/wallet.repository";

export const walletService = {

  async getBalance() {

    const wallet =
      await walletRepository.findByUserId(
        1
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

    const wallet =
      await walletRepository.findByUserId(
        1
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

    const sender =
      await walletRepository.findByUserId(
        1
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

    await walletRepository.updateBalance(
      Number(sender.id_prtfl),
      newSenderBalance
    );

    await walletRepository.updateBalance(
      Number(recipient.id_prtfl),
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
