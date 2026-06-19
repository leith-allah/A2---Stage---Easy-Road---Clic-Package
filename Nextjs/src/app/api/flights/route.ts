
import { NextRequest }
from "next/server";

import {
  flightService,
}
from "@/server/services/flight.service";

import {
  createFlightSchema,
}
from "@/server/validations/flight/create-flight.validation";

import {
  requirePermission,
}
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

  const body =
    await request.json();

  const data =
    createFlightSchema.parse(
      body
    );

  const flight =
    await flightService.createFlight({

      airline:
        data.airline,

      departureLocation:
        data.departureLocation,

      destination:
        data.destination,

      departureDate:
        new Date(data.departureDate),

      departureTime:
        new Date(data.departureTime),

      arrivalTime:
        new Date(data.arrivalTime),

      returnDate:
        data.returnDate
          ? new Date(data.returnDate)
          : null,

      returnDepartureTime:
        data.returnDepartureTime
          ? new Date(data.returnDepartureTime)
          : null,

      returnArrivalTime:
        data.returnArrivalTime
          ? new Date(data.returnArrivalTime)
          : null,

      flightNumber:
        data.flightNumber,

    });

  return Response.json(
    flight,
    {
      status: 201,
    }
  );

}
