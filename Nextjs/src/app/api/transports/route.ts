
import { NextRequest }
from "next/server";

import {
  transportService,
}
from "@/server/services/transport.service";

import {
  createTransportSchema,
}
from "@/server/validations/transport/create-transport.validation";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "transport:view"
  );

  const transports =
    await transportService.getAllTransports();

  return Response.json(
    transports
  );

}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "transport:create"
  );

  const body =
    await request.json();

  const data =
    createTransportSchema.parse(
      body
    );

  const transport =
    await transportService.createTransport(
      data
    );

  return Response.json(
    transport,
    {
      status: 201,
    }
  );

}
