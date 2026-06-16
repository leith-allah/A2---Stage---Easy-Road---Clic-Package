
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

    firstName: string;

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
      await userRepository.create({

        mle_user:
          crypto.randomUUID(),

        nin_user:
          data.nin,

        nom_user:
          data.lastName,

        prenom_user:
          data.firstName,

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
            id_role:
              BigInt(4),
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

      });

    await walletRepository.create(
      Number(
        user.id_user
      )
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

        firstName:
          user.prenom_user,

        lastName:
          user.nom_user,

        role:
          "CLIENT",

      },

    };

  },

};
