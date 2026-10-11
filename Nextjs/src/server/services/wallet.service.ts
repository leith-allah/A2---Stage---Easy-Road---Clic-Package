
import crypto from "crypto";
import { prisma } from "@/server/db/prisma";
import { walletRepository } from "@/server/repositories/wallet.repository";
import { getCurrentUserId } from "@/server/auth/session";

export const walletService = {
  async getBalance() {
    const userId = await getCurrentUserId();
    const wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
      throw new Error("Portefeuille introuvable.");
    }

    return {
      balance: Number(wallet.solde_total_prtfl),
      num_prtfl: wallet.num_prtfl,
    };
  },

  async topup(amount: number, comment?: string) {
    if (amount <= 0) {
      throw new Error("Montant invalide.");
    }

    const userId = await getCurrentUserId();

    const request = await prisma.demande_rechargement.create({
      data: {
        statut_demande_recharge: "EN_ATTENTE",
        montant_demande_recharge: amount,
        date_heure_demande_recharge: new Date(),
        comment_demande_recharge: comment || null,
        id_user: BigInt(userId),
      },
    });

    return {
      success: true,
      requestId: Number(request.id_demande_recharge),
      status: request.statut_demande_recharge,
    };
  },

  async transfer(recipientQuery: string, amount: number, note?: string) {
    if (amount <= 0) {
      throw new Error("Le montant doit être supérieur à 0 DZD.");
    }

    const userId = await getCurrentUserId();
    const senderWallet = await walletRepository.findByUserId(userId);

    if (!senderWallet) {
      throw new Error("Votre portefeuille est introuvable.");
    }

    const senderBalance = Number(senderWallet.solde_total_prtfl);
    if (senderBalance < amount) {
      throw new Error("Solde insuffisant pour effectuer ce virement.");
    }

    // Recherche du destinataire par Email ou Numéro de portefeuille
    const recipientUser = await prisma.utilisateur.findFirst({
      where: {
        OR: [
          { email_pro_user: recipientQuery.trim() },
          { portefeuille: { num_prtfl: recipientQuery.trim() } },
        ],
      },
      include: {
        portefeuille: true,
      },
    });

    if (!recipientUser || !recipientUser.portefeuille) {
      throw new Error("Aucun destinataire trouvé avec cet email ou numéro de compte.");
    }

    const recipientWallet = recipientUser.portefeuille;

    if (Number(senderWallet.id_prtfl) === Number(recipientWallet.id_prtfl)) {
      throw new Error("Vous ne pouvez pas effectuer un virement vers votre propre compte.");
    }

    // Exécution de la transaction sécurisée
    const result = await prisma.$transaction(async (tx) => {
      // 1. Débit de l'expéditeur
      const newSenderBalance = senderBalance - amount;
      await tx.portefeuille.update({
        where: { id_prtfl: senderWallet.id_prtfl },
        data: {
          solde_total_prtfl: newSenderBalance,
          derniere_maj_prtfl: new Date(),
        },
      });

      // 2. Crédit du destinataire
      const newRecipientBalance = Number(recipientWallet.solde_total_prtfl) + amount;
      await tx.portefeuille.update({
        where: { id_prtfl: recipientWallet.id_prtfl },
        data: {
          solde_total_prtfl: newRecipientBalance,
          derniere_maj_prtfl: new Date(),
        },
      });

      // 3. Enregistrement de l'historique
      await tx.transactions.create({
        data: {
          ref_transac: `TRF-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
          type_transac: "VIREMENT_ENTRANT_SORTANT",
          statut_transac: "SUCCES",
          montant_transac: amount,
          description_transac: note || `Virement vers ${recipientUser.prenom_user} ${recipientUser.nom_user}`,
          date_heure_transac: new Date(),
          id_portefeuille_source: senderWallet.id_prtfl,
          id_portefeuille_dest: recipientWallet.id_prtfl,
          id_user: BigInt(userId),
        },
      });

      return {
        success: true,
        newBalance: newSenderBalance,
        recipientName: `${recipientUser.prenom_user} ${recipientUser.nom_user}`,
      };
    });

    return result;
  },

  async getWalletSummary() {
      const userId = await getCurrentUserId();

      const user = await prisma.utilisateur.findUnique({
        where: { id_user: BigInt(userId) },
        include: {
          portefeuille: true,
        },
      });

      if (!user || !user.portefeuille) {
        throw new Error("Portefeuille introuvable");
      }

      const wallet = user.portefeuille;

      // 1. Nombre réel de factures (achats de packages réalisés par cet utilisateur)
      const invoicesCount = await prisma.achat_package.count({
        where: { id_user: BigInt(userId) },
      });

      // 2. Dernière transaction réelle de l'utilisateur
      const lastTx = await prisma.transactions.findFirst({
        where: {
          OR: [
            { id_portefeuille_source: wallet.id_prtfl },
            { id_portefeuille_dest: wallet.id_prtfl },
          ],
        },
        orderBy: { date_heure_transac: "desc" },
      });

      let lastTransaction = null;
      if (lastTx) {
        const isCredit = lastTx.id_portefeuille_dest === wallet.id_prtfl;
        lastTransaction = {
          amount: Number(lastTx.montant_transac),
          isCredit,
          description:
            lastTx.description_transac ||
            (isCredit ? "Rechargement / Crédit" : "Achat / Virement envoyé"),
          date: lastTx.date_heure_transac,
        };
      }

      return {
        balance: Number(wallet.solde_total_prtfl),
        lastUpdate: wallet.derniere_maj_prtfl,
        invoicesCount,
        lastTransaction,
        accountStatus: user.statut_user === "ACTIF" ? "Vérifié" : user.statut_user,
      };
    },
}
