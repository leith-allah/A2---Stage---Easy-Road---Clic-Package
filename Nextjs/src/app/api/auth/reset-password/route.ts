
import { NextResponse }
from "next/server";

import {
  verifyToken,
}
from "@/server/auth/jwt";

import {
  hashPassword,
}
from "@/server/auth/password";

import {
  userRepository,
}
from "@/server/repositories/user.repository";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  try {

    const payload =
      verifyToken(
        body.token
      );

    const password =
      await hashPassword(
        body.password
      );

    await userRepository.update(
      payload.sub,
      {
        mdp_user:
          password,
      }
    );

    return NextResponse.json({

      success: true,

    });

  } catch {

    return NextResponse.json(
      {
        message:
          "Token invalide",
      },
      {
        status: 400,
      }
    );

  }

}
