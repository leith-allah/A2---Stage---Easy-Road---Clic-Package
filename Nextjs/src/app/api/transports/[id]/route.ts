
import { NextRequest } from "next/server";

import { transportController } from "@/server/container/controllers/transport.controller";

import { updateTransportSchema } from "@/server/validations/transport/update-transport.validation";

import { requirePermission } from "@/server/middlewares/permission.middleware";

type Params = {

  params: Promise<{

    id: string;

  }>;

};

export async function GET(

  _: NextRequest,

  { params }: Params,

) {

  await requirePermission(

    "transport:view"

  );

  const { id } =

    await params;

  const transport =

    await transportController.getById(

      Number(id),

    );

  return Response.json(

    transport,

  );

}

export async function PATCH(

  request: NextRequest,

  { params }: Params,

) {

  await requirePermission(

    "transport:update"

  );

  const { id } =

    await params;

  const body =

    await request.json();

  const data =

    updateTransportSchema.parse(body);

  const transport =

    await transportController.update(

      Number(id),

      {

        route: data.trajet,

        company: data.company,

      },

    );

  return Response.json(

    transport,

  );

}

export async function DELETE(

  _: NextRequest,

  { params }: Params,

) {

  await requirePermission(

    "transport:delete"

  );

  const { id } =

    await params;

  const transport =

    await transportController.delete(

      Number(id),

    );

  return Response.json(

    transport,

  );

}
