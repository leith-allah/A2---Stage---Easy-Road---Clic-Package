
import { NextResponse } from "next/server";

import { comparePassword } from "@/server/auth/password";
import { signToken, signRefreshToken } from "@/server/auth/jwt";

import {
  setAuthCookie,
  setRefreshCookie,
} from "@/server/auth/cookies";

import { userRepository }
from "@/server/repositories/user.repository";

import { UserRole }
from "@/server/types/auth.types";


export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const {
    email,
    password,
  } = body;

  const user =
    await userRepository.findByEmail(
      email
    );

  if (!user) {

    return NextResponse.json(
      {
        message:
          "Email ou mot de passe incorrect",
      },
      {
        status: 401,
      }
    );

  }

  if (
    user.statut_user === "SUSPENDU"
  ) {

    return NextResponse.json(
      {
        message:
          "Compte suspendu",
      },
      {
        status: 403,
      }
    );

  }

  if (
    user.statut_user === "EN_ATTENTE"
  ) {

    return NextResponse.json(
      {
        message:
          "Compte en attente de validation",
      },
      {
        status: 403,
      }
    );

  }

  const validPassword =
    await comparePassword(
      password,
      user.mdp_user
    );

  if (!validPassword) {

    return NextResponse.json(
      {
        message:
          "Email ou mot de passe incorrect",
      },
      {
        status: 401,
      }
    );

  }

  const role: UserRole =

    user.role.nom_role === "AGENT"

      ? "AGENCY"

      : user.role.nom_role === "SUPER_ADMIN"

        ? "SUPER_ADMIN"

        : user.role.nom_role === "ADMIN"

          ? "ADMIN"

          : "CLIENT";

  const token =
    signToken({

      sub:
        Number(user.id_user),

      email:
        user.email_pro_user,

      role,

    });

  const refreshToken =
    signRefreshToken({

      sub:
        Number(user.id_user),

      email:
        user.email_pro_user,

      role,

    });

  await setAuthCookie(
    token
  );

  await setRefreshCookie(
    refreshToken
  );

  return NextResponse.json({

    message:
      "Connexion réussie",

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

      role,

    },

  });

}
