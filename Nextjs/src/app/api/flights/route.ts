
import { NextRequest, NextResponse }
from "next/server";

import { flightService }
from "@/server/services/flight.service";

import { CreateFlightDto }
from "@/server/dto/flight/create-flight.dto";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

export async function GET() {

  await requirePermission(
    "flight:view"
  );

  const flights =
    await flightService.getAllFlights();

  return Response.json(
    flights
  );

}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "flight:create"
  );

  const body: CreateFlightDto =
    await request.json();

  const createdFlight =
    await flightService.createFlight(
      body
    );

  return NextResponse.json(
    {
      id: Number(createdFlight.id_vol),
    },
    {
      status: 201,
    }
  );

}
