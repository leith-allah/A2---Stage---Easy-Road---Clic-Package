
import { cookies }
from "next/headers";

import { NextResponse }
from "next/server";

import {
  REFRESH_COOKIE_NAME,
}
from "@/server/constants/auth.constants";

import {
  verifyToken,
  signToken,
}
from "@/server/auth/jwt";

import {
  setAuthCookie,
}
from "@/server/auth/cookies";

export async function POST() {

  const cookieStore =
    await cookies();

  const refreshToken =
    cookieStore.get(
      REFRESH_COOKIE_NAME
    )?.value;

  if (!refreshToken) {

    return NextResponse.json(
      {
        message:
          "Refresh token manquant",
      },
      {
        status: 401,
      }
    );

  }

  try {

    const payload =
      verifyToken(
        refreshToken
      );

    const accessToken =
      signToken(payload);

    await setAuthCookie(
      accessToken
    );

    return NextResponse.json({
      success: true,
    });

  } catch {

    return NextResponse.json(
      {
        message:
          "Refresh token invalide",
      },
      {
        status: 401,
      }
    );

  }

}
