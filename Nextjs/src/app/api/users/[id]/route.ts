
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  validateBody,
} from "@/server/validations/validate-request";

import {
  updateUserSchema,
} from "@/server/validations/user/update-user.validation";

import {
  userService,
} from "@/server/services/user.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { canManageRole } 
from "@/server/auth/role-hierarchy";

import { getCurrentUser } 
from "@/server/auth/current-user";


type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "user:view"
  );

  const { id } =
    await params;

  const user =
    await userService.getUserById(
      Number(id)
    );

  return successResponse(
    user
  );
}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "user:update"
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

  const data =
    await validateBody(
      request,
      updateUserSchema
    );

  const user =
    await userService.updateUser(
      Number(id),
      data
    );

  return successResponse(
    user
  );
}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;
    await requirePermission(
      "user:delete"
    );

  const currentUser =
    await getCurrentUser();

    await userService.validateRoleManagement(
      currentUser.role,
      Number(id)
    );

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

  await userService.deleteUser(
    Number(id)
  );

  return successResponse({
    deleted: true,
  });
}
