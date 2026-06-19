
import { NextRequest }
from "next/server";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageTransportService }
from "@/server/services/package-transport.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: NextRequest,
  { params }: Params
) {

  await requirePermission(
    "package:view"
  );

  const { id } =
    await params;

  const transports =
    await packageTransportService.getTransportsByPackage(
      Number(id)
    );

  return Response.json(
    transports
  );

}

export async function POST(
  request: NextRequest,
  { params }: Params
) {

  await requirePermission(
    "package:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const result =
    await packageTransportService.addTransportToPackage(

      Number(id),

      Number(
        body.transportId
      )

    );

  return Response.json(
    result,
    {
      status: 201,
    }
  );

}
