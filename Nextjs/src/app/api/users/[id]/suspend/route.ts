
import { successResponse }
from "@/server/api/responses/success";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { userService }
from "@/server/services/user.service";

import { canManageRole }
from "@/server/auth/role-hierarchy";

import { getCurrentUser } 
from "@/server/auth/current-user";


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
    "user:suspend"
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
    await userService.suspendUser(
      Number(id)
    );

  return successResponse(
    user
  );

}
