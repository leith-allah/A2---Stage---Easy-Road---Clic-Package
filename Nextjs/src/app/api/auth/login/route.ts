
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

import { USER_STATUS }
from "@/server/constants/user-status";

import { AUTH_COOKIE_NAME }
from "@/server/constants/auth.constants";


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
    user.statut_user === USER_STATUS.SUSPENDED
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
    user.statut_user === USER_STATUS.PENDING
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

  if (
    user.statut_user === USER_STATUS.DELETED
  ) {

    return NextResponse.json(
      {
        message:
          "Compte supprimé",
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

  const roleName =
    user.role.nom_role;

  if (
    ![
      "OWNER",
      "SUPER_ADMIN",
      "ADMIN",
      "AGENCY",
      "CLIENT",
    ].includes(roleName)
  ) {

    return NextResponse.json(
      {
        message:
          "Rôle invalide",
      },
      {
        status: 403,
      }
    );

  }

  const role =
    roleName as UserRole;

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

  console.log(
    "LOGIN SUCCESS",
    AUTH_COOKIE_NAME
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

      FIRSTName:
        user.prenom_user,

      lastName:
        user.nom_user,

      role,

    },

  });

}
