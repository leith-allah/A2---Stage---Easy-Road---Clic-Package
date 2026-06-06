
import {
  roleService,
}
from "@/server/services/role.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

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

  const { id } =
    await params;

  const body =
    await request.json();

  const role =
    await roleService.updateRole(

      Number(id),

      body.name

    );

  return Response.json(
    role
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await roleService.deleteRole(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
