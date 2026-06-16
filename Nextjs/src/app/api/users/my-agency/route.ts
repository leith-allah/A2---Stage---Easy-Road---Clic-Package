
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  getCurrentUser,
} from "@/server/auth/current-user";

import { prisma }
from "@/server/db/prisma";

export async function GET() {

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
                    utilisateur: true,
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

  return successResponse({

    agency:
      user.bureau_agence.agence,

    offices:
      user.bureau_agence.agence.bureau_agence,

  });

}
