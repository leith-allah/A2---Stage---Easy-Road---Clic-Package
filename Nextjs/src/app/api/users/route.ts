
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  createUserSchema,
} from "@/server/validations/user/create-user.validation";

import {
  userService,
} from "@/server/services/user.service";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";

import {
  hashPassword,
} from "@/server/auth/password";

import {
  USER_STATUS,
} from "@/server/constants/user-status";


export async function GET() {

  await requirePermission(
    "user:view"
  );

  const users =
    await userService.getAllUsers();

  return successResponse(
    users
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "user:create"
  );

  const data =
    await validateBody(
      request,
      createUserSchema
    );

  const hashedPassword =
    await hashPassword(
      data.mdp_user
    );

  const user =
    await userService.createUser({

      mle_user:
        crypto.randomUUID(),

      nin_user:
        data.nin_user,

      nom_user:
        data.nom_user,

      prenom_user:
        data.prenom_user,

      ddn_user:
        new Date(
          data.ddn_user
        ),

      nat_user:
        data.nat_user,

      statut_user:
        USER_STATUS.ACTIVE,

      email_pro_user:
        data.email_pro_user,

      mdp_user:
        hashedPassword,

      dcc_user:
        new Date(),

      role: {

        connect: {
          id_role:
            BigInt(data.id_role),
        },

      },

      bureau_agence: {

        connect: {
          id_bureau:
            BigInt(data.id_bureau),
        },

      },

    });

  return successResponse(
    user,
    201,
    "Utilisateur créé"
  );

}
