
import { NextRequest } from "next/server";

import { transportController } from "@/server/container/controllers/transport.controller";

import { createTransportSchema } from "@/server/validations/transport/create-transport.validation";

import { requirePermission } from "@/server/middlewares/permission.middleware";

export async function GET() {

  await requirePermission(

    "transport:view"

  );

  const transports =

    await transportController.getAll();

  return Response.json(

    transports

  );

}

export async function POST(

  request: NextRequest,

) {

  await requirePermission(

    "transport:create"

  );

  const body =

    await request.json();

  const data =

    createTransportSchema.parse(body);

  const transport =

    await transportController.create({

      route: data.trajet,

      company: data.company ?? null,

    });

  return Response.json(

    transport,

    {

      status: 201,

    },

  );

}
