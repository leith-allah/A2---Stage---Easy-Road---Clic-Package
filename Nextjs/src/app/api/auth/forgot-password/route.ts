
import { NextResponse }
from "next/server";

import {
  userRepository,
}
from "@/server/repositories/user.repository";

import {
  signToken,
}
from "@/server/auth/jwt";

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const user =
    await userRepository.findByEmail(
      body.email
    );

  if (!user) {

    return NextResponse.json({
      success: true,
    });

  }

  const token =
    signToken({

      sub:
        Number(user.id_user),

      email:
        user.email_pro_user,

      role:
        "CLIENT",

    });

  return NextResponse.json({

    success: true,

    resetToken:
      token,

  });

}
