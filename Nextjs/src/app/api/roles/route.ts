
import {
  roleService,
}
from "@/server/services/role.service";

export async function GET() {

  const roles =
    await roleService.getAllRoles();

  return Response.json(
    roles
  );

}

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const role =
    await roleService.createRole(
      body.name
    );

  return Response.json(
    role,
    {
      status: 201,
    }
  );

}
