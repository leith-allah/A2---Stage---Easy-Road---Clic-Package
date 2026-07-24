
import { NextResponse }
from "next/server";

import { hashPassword }
from "@/server/auth/password";

import { userRepository }
from "@/server/repositories/user.repository";

import { walletRepository }
from "@/server/repositories/wallet.repository";

import { registerSchema }
from "@/server/validations/auth/register.validation";

import { validateBody }
from "@/server/utils/validate-body";

import { USER_STATUS }
from "@/server/constants/user-status";


export async function POST(
  request: Request
) {

  const body =
    await validateBody(
      request,
      registerSchema
    );

  const existingUser =
    await userRepository.findByEmail(
      body.email
    );

  if (existingUser) {

    return NextResponse.json(
      {
        message:
          "Email déjà utilisé",
      },
      {
        status: 409,
      }
    );

  }

  const hashedPassword =
    await hashPassword(
      body.password
    );

  const user =
    await userRepository.create({

      bureau_agence: {

        connect: {
          id_bureau: BigInt(body.id_bureau),
        },

      },

      mle_user:
        crypto.randomUUID(),

      nin_user:
        body.nin,

      nom_user:
        body.lastName,

      prenom_user:
        body.FIRSTName,

      ddn_user:
        new Date(
          body.birthDate
        ),

      nat_user:
        body.nationality,

      statut_user:
        USER_STATUS.PENDING,

      email_pro_user:
        body.email,

      mdp_user:
        hashedPassword,

      dcc_user:
        new Date(),

      role: {

        connect: {
          id_role: BigInt(4),
        },

      },

    });

  await walletRepository.create(
    Number(
      user.id_user
    )
  );

  return NextResponse.json(
    {
      success: true,
    },
    {
      status: 201,
    }
  );

}
