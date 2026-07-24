
import { successResponse } from "@/server/api/responses/success";

import { getCurrentUser } from "@/server/auth/current-user";

import { prisma } from "@/server/db/prisma";

import crypto from "crypto";

import { hashPassword }
from "@/server/auth/password";

import { walletRepository } 
from "@/server/repositories/wallet.repository";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { USER_STATUS }
from "@/server/constants/user-status";


export async function GET() {

  await requirePermission(
    "user:view"
  );

  const currentUser =
    await getCurrentUser();

  const user =
    await prisma.utilisateur.findUnique({

      where: {
        id_user:
          BigInt(currentUser.id),
      },

      include: {

        bureau_agence: {

          include: {

            agence: {

              include: {

                bureau_agence: {

                  include: {

                    utilisateur: {

                      include: {
                        role: true,
                      },

                    },

                  },

                },

              },

            },

          },

        },

      },

    });

  if (!user) {

    throw new Error(
      "Utilisateur introuvable"
    );

  }

  const employees =
    user
      .bureau_agence
      .agence
      .bureau_agence
      .flatMap(
        bureau =>
          bureau.utilisateur.map(
            utilisateur => ({

              id:
                Number(
                  utilisateur.id_user
                ),

              nom:
                utilisateur.nom_user,

              prenom:
                utilisateur.prenom_user,

              email:
                utilisateur.email_pro_user,

              statut:
                utilisateur.statut_user,

              role:
                utilisateur.role.nom_role,

              bureau:
                bureau.ville_bureau,

              bureauId:
                Number(
                  bureau.id_bureau
                ),

            })
          )
      );

  return successResponse(
    employees
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "user:create"
  );

  const currentUser =
    await getCurrentUser();

  const body =
    await request.json();

  const agencyUser =
    await prisma.utilisateur.findUnique({

        where: {
        id_user:
            BigInt(currentUser.id),
        },

        include: {

        bureau_agence: {
            include: {
            agence: true,
            },
        },
        },
    });

    if (!agencyUser) {

        throw new Error(
            "Agence introuvable"
        );
    }

  const targetOffice =
    await prisma.bureau_agence.findUnique({

        where: {
        id_bureau:
            BigInt(
            body.id_bureau
            ),
        },
    });

    if (!targetOffice) {

        throw new Error(
            "Bureau introuvable"
        );
    }

    if (
        targetOffice.id_agence !==
        agencyUser.bureau_agence.id_agence
    ) {
        throw new Error(
            "Ce bureau n'appartient pas à votre agence"
        );
    }

  const hashedPassword =
    await hashPassword(
      body.password
    );

  const user =
    await prisma.utilisateur.create({

      data: {

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

        email_pro_user:
          body.email,

        mdp_user:
          hashedPassword,

        statut_user:
          USER_STATUS.ACTIVE,

        dcc_user:
          new Date(),

        bureau_agence: {

          connect: {
            id_bureau:
              BigInt(
                body.id_bureau
              ),
          },

        },

        role: {

          connect: {
            id_role: BigInt(5),
          },

        },

      },

    });

  await walletRepository.create(
    Number(
      user.id_user
    )
  );

  return successResponse({

    created: true,

    userId:
      Number(
        user.id_user
      ),

  });

}
