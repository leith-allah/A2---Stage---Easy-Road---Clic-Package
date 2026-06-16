
import { successResponse }
from "@/server/api/responses/success";

import { getCurrentUser }
from "@/server/auth/current-user";

import { prisma }
from "@/server/db/prisma";

import { requirePermission } from "@/server/middlewares/permission.middleware";

import { USER_STATUS }
from "@/server/constants/user-status";


type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "user:update"
  );

  const currentUser =
    await getCurrentUser();

  const { id } =
    await params;

  const agencyUser =
    await prisma.utilisateur.findUnique({

      where: {
        id_user:
          BigInt(currentUser.id),
      },

      include: {
        bureau_agence: true,
      },

    });

  if (!agencyUser) {

    throw new Error(
      "Agence introuvable"
    );

  }

  const employee =
    await prisma.utilisateur.findUnique({

      where: {
        id_user: BigInt(id),
      },

      include: {
        bureau_agence: true,
        role: true,
      },

    });

  if (!employee) {

    throw new Error(
      "Employé introuvable"
    );

  }

  if (
    employee.role.nom_role !==
    "CLIENT"
  ) {
    throw new Error(
      "Seuls les comptes CLIENT peuvent être modifiés"
    );
  }

  if (

    employee.bureau_agence.id_agence !==
    agencyUser.bureau_agence.id_agence

  ) {

    throw new Error(
      "Employé hors agence"
    );

  }

  if (
    Number(employee.id_user) ===
    Number(currentUser.id)
  ) {

    throw new Error(
      "Impossible de modifier votre propre compte"
    );

  }

  const updated =
    await prisma.utilisateur.update({

      where: {
        id_user:
          BigInt(id),
      },

      data: {
        statut_user:
          USER_STATUS.SUSPENDED,
      },

    });

  return successResponse(
    updated
  );

}
