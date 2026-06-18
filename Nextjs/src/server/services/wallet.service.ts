import { walletRepository }
from "@/server/repositories/wallet.repository";

import { getCurrentUserId }
from "@/server/auth/session";

import { transactionRepository }
from "@/server/repositories/transaction.repository";

import { rechargeRequestRepository }
from "@/server/repositories/recharge-request.repository";

import { TRANSACTION_TYPE }
from "@/server/constants/transaction-type";

import { TRANSACTION_STATUS }
from "@/server/constants/transaction-status";


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
        "Wallet not found"
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

    if (amount <= 0) {

      throw new Error(
        "Invalid amount"
      );

    }

    const userId =
      await getCurrentUserId();

    const request =
      await rechargeRequestRepository.create({

        userId,

        amount,

      });

    return {

      success: true,

      requestId:
        Number(
          request.id_demande_recharge
        ),

      status:
        request.statut_demande_recharge,

    };

  },

  async transfer(
    recipientId: number,
    amount: number
  ) {

    if (amount <= 0) {

      throw new Error(
        "Invalid amount"
      );

    }

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
        "Wallet not found"
      );

    }

    if (
      Number(sender.id_prtfl) ===
      Number(recipient.id_prtfl)
    ) {

      throw new Error(
        "Cannot transfer to yourself"
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
        "Insufficient balance"
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

    await transactionRepository.create({

      sourceWalletId:
        Number(sender.id_prtfl),

      destinationWalletId:
        Number(recipient.id_prtfl),

      amount,

      type:
        TRANSACTION_TYPE.TRANSFER,

      status:
        TRANSACTION_STATUS.SUCCESS,

    });

    return {

      success: true,

      balance:
        newSenderBalance,

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
        "Wallet not found"
      );

    }

    return wallet;

  },

  async getMyWallet() {

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

    return wallet;

  },

  async createWallet(
    userId: number
  ) {

    const existingWallet =
      await walletRepository.findByUserId(
        userId
      );

    if (existingWallet) {

      throw new Error(
        "Wallet already exists"
      );

    }

    return walletRepository.create(
      userId
    );

  },

  async deleteWallet(
    _: number
  ) {

    throw new Error(
      "La suppression des portefeuilles est interdite"
    );

  },

};
