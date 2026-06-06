
import {
  transportService,
}
from "@/server/services/transport.service";

import {
  updateTransportSchema,
}
from "@/server/validations/transport/update-transport.validation";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";


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
    "transport:view"
  );

  const { id } =
    await params;

  const transport =
    await transportService.getTransportById(
      Number(id)
    );

  return Response.json(
    transport
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "transport:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateTransportSchema.parse(
      body
    );

  const transport =
    await transportService.updateTransport(
      Number(id),
      data
    );

  return Response.json(
    transport
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "transport:delete"
  );

  const { id } =
    await params;

  await transportService.deleteTransport(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
