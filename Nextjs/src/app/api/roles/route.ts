
import {
  roleService,
}
from "@/server/services/role.service";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";

import {
  createRoleSchema,
}
from "@/server/validations/role/create-role.validation";


export async function GET() {

  await requirePermission(
    "role:view"
  );

  const roles =
    await roleService.getAllRoles();

  return Response.json(
    roles
  );

}

export async function POST(
  request: Request
) {

  await requirePermission(
    "role:create"
  );

  const body =
    await request.json();

  const data =
    createRoleSchema.parse(
      body
    );

  const role =
    await roleService.createRole(
      data.name
    );

  console.log(
    await roleService.getAllRoles()
  );

  return Response.json(
    role,
    {
      status: 201,
    }
  );

}
