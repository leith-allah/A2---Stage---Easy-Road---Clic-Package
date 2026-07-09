
import { NextRequest } from "next/server";

import { excursionController }

from "@/server/container/controllers/excursion.controller";

import { updateExcursionSchema }

from "@/server/validations/excursion/update-excursion.validation";

import { requirePermission }

from "@/server/middlewares/permission.middleware";

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

    "excursion:view",

  );

  const { id } =

    await params;

  return Response.json(

    await excursionController.getById(

      Number(id),

    ),

  );

}

export async function PATCH(

  request: NextRequest,

  { params }: Params,

) {

  await requirePermission(

    "excursion:update",

  );

  const { id } =

    await params;

  const body =

    await request.json();

  const data =

    updateExcursionSchema.parse(body);

  return Response.json(

    await excursionController.update(

      Number(id),

      data,

    ),

  );

}

export async function DELETE(

  _: NextRequest,

  { params }: Params,

) {

  await requirePermission(

    "excursion:delete",

  );

  const { id } =

    await params;

  return Response.json(

    await excursionController.delete(

      Number(id),

    ),

  );

}
