
import {
  roleService,
}
from "@/server/services/role.service";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";

import {
  updateRoleSchema,
}
from "@/server/validations/role/update-role.validation";

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
    "role:view"
  );

  const { id } =
    await params;

  const role =
    await roleService.getRoleById(
      Number(id)
    );

  return Response.json(
    role
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "role:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateRoleSchema.parse(
      body
    );

  const role =
    await roleService.updateRole(

      Number(id),

      data.name ?? ""

    );

  return Response.json(
    role
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "role:delete"
  );

  const { id } =
    await params;

  await roleService.deleteRole(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
