
import { NextResponse } from "next/server";

import { comparePassword } from "@/server/auth/password";
import { signToken } from "@/server/auth/jwt";
import { setAuthCookie } from "@/server/auth/cookies";
import { userRepository } from "@/server/repositories/user.repository";

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
    await userRepository.findByEmail(email);

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

  const token =
    signToken({
      sub: Number(
        user.id_user
      ),

      email:
        user.email_pro_user,

      role:
        user.statut_user as
          | "ADMIN"
          | "AGENCY"
          | "CLIENT",
    });

  return NextResponse.json({
    message:
      "Connexion réussie",

    user: {
      id: Number(
        user.id_user
      ),

      email:
        user.email_pro_user,

      firstName:
        user.prenom_user,

      lastName:
        user.nom_user,

      role:
        user.statut_user,
    }
  });
}
