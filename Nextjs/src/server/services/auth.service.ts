
import { prisma }
from "@/server/db/prisma";

import {
  hashPassword,
} from "@/server/auth/password";

import {
  signToken,
} from "@/server/auth/jwt";

import {
  userRepository,
} from "@/server/repositories/user.repository";

import {
  walletRepository,
} from "@/server/repositories/wallet.repository";

import {
  USER_STATUS,
} from "@/server/constants/user-status";


export const authService = {

  async register(data: {

    nin: string;

    FIRSTName: string;

    lastName: string;

    birthDate: string;

    nationality: string;

    email: string;

    password: string;

    id_bureau: number;

  }) {

    const existingUser =
      await userRepository.findByEmail(
        data.email
      );

    if (existingUser) {

      throw new Error(
        "Email déjà utilisé"
      );

    }

    const hashedPassword =
      await hashPassword(
        data.password
      );

    const user =
      await prisma.$transaction(

        async (tx) => {

          const user =

            await tx.utilisateur.create({

              data: {

                mle_user:
                  crypto.randomUUID(),

                nin_user:
                  data.nin,

                nom_user:
                  data.lastName,

                prenom_user:
                  data.FIRSTName,

                ddn_user:
                  new Date(
                    data.birthDate
                  ),

                nat_user:
                  data.nationality,

                statut_user:
                  USER_STATUS.PENDING,

                email_pro_user:
                  data.email,

                mdp_user:
                  hashedPassword,

                dcc_user:
                  new Date(),

                role: {

                  connect: {
                    id_role: BigInt(4),
                  },

                },

                bureau_agence: {

                  connect: {

                    id_bureau:
                      BigInt(
                        data.id_bureau
                      ),

                  },

                },

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
                user.id_user,

            },

          });

          return user;

        }

      );

    const token =
      signToken({

        sub:
          Number(
            user.id_user
          ),

        email:
          user.email_pro_user,

        role:
          "CLIENT",

      });

    return {

      token,

      user: {

        id:
          Number(
            user.id_user
          ),

        email:
          user.email_pro_user,

        FIRSTName:
          user.prenom_user,

        lastName:
          user.nom_user,

        role:
          "CLIENT",

      },

    };

  },

};
