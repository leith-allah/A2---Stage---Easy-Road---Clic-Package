
import { successResponse }
from "@/server/api/responses/success";

import { validateBody }
from "@/server/validations/validate-request";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { userService }
from "@/server/services/user.service";

import { z } from "zod";

import { canManageRole } 
from "@/server/auth/role-hierarchy";

import { getCurrentUser } 
from "@/server/auth/current-user";


const schema = z.object({

  id_bureau:
    z.number(),

});

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "user:assign-office"
  );

  const body =
    await validateBody(
      request,
      schema
    );

  const { id } =
    await params;

  const currentUser =
    await getCurrentUser();

    await userService.validateRoleManagement(
      currentUser.role,
      Number(id)
    );
  
  if (
    Number(currentUser.id) ===
    Number(id)
  ) {
    throw new Error(
      "Action interdite sur votre propre compte"
    );
  }

  const targetUser =
    await userService.getUserById(
      Number(id)
    );

  if (
    !canManageRole(
      currentUser.role,
      targetUser.role
    )
  ) {

    throw new Error(
      "Permissions insuffisantes"
    );

  }

  const user =
    await userService.assignOffice(
      Number(id),
      body.id_bureau
    );

  return successResponse(
    user
  );

}
