
import {
  hashPassword,
}
from "@/server/auth/password";

import {
  signToken,
}
from "@/server/auth/jwt";

import {
  userRepository,
}
from "@/server/repositories/user.repository";

import {
  walletRepository,
}
from "@/server/repositories/wallet.repository";

export const authService = {

  async register(data: {

    nin: string;

    firstName: string;

    lastName: string;

    birthDate: string;

    nationality: string;

    email: string;

    password: string;

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

        ...data,

        password:
          hashedPassword,

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
