
import { successResponse }
from "@/server/api/responses/success";

import { getCurrentUser }
from "@/server/auth/current-user";

import { prisma }
from "@/server/db/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Params
) {

  const currentUser =
    await getCurrentUser();

  const { id } =
    await params;

  const body =
    await request.json();

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
        id_user:
          BigInt(id),
      },

      include: {

        bureau_agence: true,

      },

    });

  if (!employee) {

    throw new Error(
      "Employé introuvable"
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

  const updated =
    await prisma.utilisateur.update({

      where: {
        id_user:
          BigInt(id),
      },

      data: {

        nom_user:
          body.lastName,

        prenom_user:
          body.FIRSTName,

        email_pro_user:
          body.email,

      },

    });

  return successResponse(
    updated
  );

}
