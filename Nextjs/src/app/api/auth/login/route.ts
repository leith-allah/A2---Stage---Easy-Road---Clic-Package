
import { NextResponse } from "next/server";

import { comparePassword } from "@/server/auth/password";
import { signToken } from "@/server/auth/jwt";
import { setAuthCookie } from "@/server/auth/cookies";
import { getMockUser } from "@/server/auth/mock-user";

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
    await getMockUser();

  if (
    email !== user.email
  ) {
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
      user.password
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
      sub: user.id,
      email: user.email,
      role: user.role,
    });

  await setAuthCookie(
    token
  );

  return NextResponse.json({
    message:
      "Connexion réussie",

    user: {
      id: user.id,
      email: user.email,
      firstName:
        user.firstName,
      lastName:
        user.lastName,
      role: user.role,
    },
  });
}
