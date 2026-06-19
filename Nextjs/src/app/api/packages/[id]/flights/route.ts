
import { NextRequest }
from "next/server";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageFlightService }
from "@/server/services/package-flight.service";

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

  const flights =
    await packageFlightService.getFlightsByPackage(
      Number(id)
    );

  return Response.json(
    flights
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
    await packageFlightService.addFlightToPackage(

      Number(id),

      Number(
        body.flightId
      )

    );

  return Response.json(
    result,
    {
      status: 201,
    }
  );

}
