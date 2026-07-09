
import { NextRequest } from "next/server";

import { excursionController }

from "@/server/container/controllers/excursion.controller";

import { createExcursionSchema }

from "@/server/validations/excursion/create-excursion.validation";

import { requirePermission }

from "@/server/middlewares/permission.middleware";

export async function GET() {

  await requirePermission(

    "excursion:view",

  );

  return Response.json(

    await excursionController.getAll(),

  );

}

export async function POST(

  request: NextRequest,

) {

  await requirePermission(

    "excursion:create",

  );

  const body =

    await request.json();

  const data =

    createExcursionSchema.parse(body);

  const excursion =

    await excursionController.create(data);

  return Response.json(

    excursion,

    {

      status: 201,

    },

  );

}
