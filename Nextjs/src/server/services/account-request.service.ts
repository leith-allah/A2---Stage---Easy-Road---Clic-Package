
import { Prisma } from "@prisma/client";
import { AccountRequestRepository } from "../repositories/account-request.repository";
import { prisma } from "@/server/db/prisma";
import bcrypt from "bcryptjs";

export class AccountRequestService {
  private repository = new AccountRequestRepository();

  async getAllDemandes() {
    return this.repository.findAll();
  }

  async getDemandeById(id: bigint) {
    return this.repository.findById(id);
  }

  async getDemandesEnAttente() {
    return this.repository.findPending();
  }

  async creerDemande(data: any) {
    // 1. Vérification si l'email existe déjà dans la BDD Utilisateurs
    const existingUserEmail = await prisma.utilisateur.findFirst({
      where: { email_pro_user: data.email_user },
    });
    if (existingUserEmail) {
      throw new Error("Un compte existe déjà avec cette adresse email.");
    }

    // 2. Vérification si le NIN existe déjà dans la BDD Utilisateurs
    const existingUserNin = await prisma.utilisateur.findFirst({
      where: { nin_user: data.nin_user },
    });
    if (existingUserNin) {
      throw new Error("Un compte existe déjà avec ce numéro NIN.");
    }

    // 3. Vérification si une demande EN ATTENTE existe déjà avec cet email ou NIN
    const pendingRequest = await prisma.demande_creation_compte.findFirst({
      where: {
        statut_demande_creation: "EN_ATTENTE",
        OR: [{ email_user: data.email_user }, { nin_user: data.nin_user }],
      },
    });
    if (pendingRequest) {
      throw new Error("Une demande de création de compte est déjà en cours avec cet email ou ce NIN.");
    }

    return this.repository.create({
      statut_demande_creation: "EN_ATTENTE",
      date_heure_demande: new Date(),
      nin_user: data.nin_user,
      nom_user: data.nom_user,
      prenom_user: data.prenom_user,
      ddn_user: new Date(data.ddn_user),
      nat_user: data.nat_user,
      email_user: data.email_user,
      mdp_user: data.mdp_user,
      commentaire_demande: data.commentaire_demande ?? null,
      role: {
        connect: {
          id_role: BigInt(data.id_role),
        },
      },
      bureau_agence: {
        connect: {
          id_bureau: BigInt(data.id_bureau),
        },
      },
    });
  }

  async modifierDemande(id: bigint, data: Prisma.demande_creation_compteUpdateArgs["data"]) {
    return this.repository.update(id, data);
  }

  async supprimerDemande(id: bigint) {
    return this.repository.delete(id);
  }

  async accepterDemande(id: bigint, administrateurId: bigint) {
    const demande = await this.repository.findById(id);

    if (!demande) {
      throw new Error("Demande introuvable.");
    }

    if (demande.statut_demande_creation !== "EN_ATTENTE") {
      throw new Error("Cette demande a déjà été traitée.");
    }

    const motDePasseHash = await bcrypt.hash(demande.mdp_user, 12);

    const utilisateur = await prisma.$transaction(async (tx) => {
      const nouvelUtilisateur = await tx.utilisateur.create({
        data: {
          mle_user: crypto.randomUUID(),
          nin_user: demande.nin_user,
          nom_user: demande.nom_user,
          prenom_user: demande.prenom_user,
          ddn_user: demande.ddn_user,
          nat_user: demande.nat_user,
          statut_user: "ACTIF",
          email_pro_user: demande.email_user,
          mdp_user: motDePasseHash,
          dcc_user: new Date(),
          id_role: demande.id_role,
          id_bureau: demande.id_bureau,
        },
      });

      await tx.portefeuille.create({
        data: {
          num_prtfl: crypto.randomUUID(),
          solde_total_prtfl: 0,
          derniere_maj_prtfl: new Date(),
          id_user: nouvelUtilisateur.id_user,
        },
      });

      await tx.demande_creation_compte.update({
        where: {
          id_demande_creation: demande.id_demande_creation,
        },
        data: {
          statut_demande_creation: "ACCEPTEE",
          traite_par: administrateurId,
          date_traitement: new Date(),
        },
      });

      return nouvelUtilisateur;
    });

    return utilisateur;
  }

  async refuserDemande(id: bigint, administrateurId: bigint) {
    const demande = await this.repository.findById(id);

    if (!demande) {
      throw new Error("Demande introuvable.");
    }

    if (demande.statut_demande_creation !== "EN_ATTENTE") {
      throw new Error("Cette demande a déjà été traitée.");
    }

    return this.repository.update(id, {
      statut_demande_creation: "REFUSEE",
      traite_par: administrateurId,
      date_traitement: new Date(),
    });
  }
}
