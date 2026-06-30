
import { Prisma } from "@prisma/client";
import { AccountRequestRepository } from "../repositories/account-request.repository";

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

    async creerDemande(
        data: Prisma.demande_creation_compteCreateArgs["data"]
    ) {

        const demande = await this.repository.create({

          statut_demande_creation: "EN_ATTENTE",

          date_heure_demande: new Date(),

          nin_user: data.nin_user,

          nom_user: data.nom_user,

          prenom_user: data.prenom_user,

          ddn_user: new Date(data.ddn_user),

          nat_user: data.nat_user,

          email_user: data.email_user,

          mdp_user: data.mdp_user,

          commentaire_demande:
              data.commentaire_demande ?? null,

          role: {
              connect: {
                  id_role: data.id_role,
              },
          },

          bureau_agence: {
              connect: {
                  id_bureau: data.id_bureau,
              },
          },

      })

      return demande;
    }

    async modifierDemande(
        id: bigint,
        data: Prisma.demande_creation_compteUpdateArgs["data"]
    ) {
        return this.repository.update(id, data);
    }

    async supprimerDemande(id: bigint) {
        return this.repository.delete(id);
    }

    async accepterDemande(
        id: bigint,
        administrateurId: bigint
    ) {

        const demande =
            await this.repository.findById(id);

        if (!demande) {

            throw new Error(
                "Demande introuvable."
            );

        }

        if (
            demande.statut_demande_creation !==
            "EN_ATTENTE"
        ) {

            throw new Error(
                "Cette demande a déjà été traitée."
            );

        }

        /*
            TODO

            Plus tard, cette partie sera déplacée
            dans UserService + WalletService.

            Pour l'instant on garde tout ici.
        */

        const prisma = this.repository.getPrisma();

        const motDePasseHash = await bcrypt.hash(
            demande.mdp_user,
            12
        );

        const utilisateur = await prisma.$transaction(

            async (tx) => {

                const nouvelUtilisateur =
                    await tx.utilisateur.create({

                        data: {

                            mle_user:
                                crypto.randomUUID(),

                            nin_user:
                                demande.nin_user,

                            nom_user:
                                demande.nom_user,

                            prenom_user:
                                demande.prenom_user,

                            ddn_user:
                                demande.ddn_user,

                            nat_user:
                                demande.nat_user,

                            statut_user:
                                "ACTIF",

                            email_pro_user:
                                demande.email_user,

                            mdp_user:
                                motDePasseHash,

                            dcc_user:
                                new Date(),

                            id_role:
                                demande.id_role,

                            id_bureau:
                                demande.id_bureau,

                        },

                    });

                await tx.portefeuille.create({

                    data: {

                        num_prtfl:
                            crypto.randomUUID(),

                        solde_total_prtfl: 0,

                        derniere_maj_prtfl:
                            new Date(),

                        id_user:
                            nouvelUtilisateur.id_user,

                    },

                });

                await tx.demande_creation_compte.update({

                    where: {

                        id_demande_creation:
                            demande.id_demande_creation,

                    },

                    data: {

                        statut_demande_creation:
                            "ACCEPTEE",

                        traite_par:
                            administrateurId,

                        date_traitement:
                            new Date(),

                    },

                });

                return nouvelUtilisateur;

            }

        );

        return utilisateur;

    }

    async refuserDemande(
        id: bigint,
        administrateurId: bigint
    ) {

        const demande =
            await this.repository.findById(id);

        if (!demande) {
            throw new Error("Demande introuvable.");
        }

        if (
            demande.statut_demande_creation !==
            "EN_ATTENTE"
        ) {
            throw new Error(
                "Cette demande a déjà été traitée."
            );
        }

        return this.repository.update(id, {
            statut_demande_creation: "REFUSEE",
            traite_par: administrateurId,
            date_traitement: new Date(),
        });

    }

}
