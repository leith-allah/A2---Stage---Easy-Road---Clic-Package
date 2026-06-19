
import {
  flightService,
}
from "@/server/services/flight.service";

import {
  updateFlightSchema,
}
from "@/server/validations/flight/update-flight.validation";

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
    "flight:view"
  );

  const { id } =
    await params;

  const flight =
    await flightService.getFlightById(
      Number(id)
    );

  return Response.json(
    flight
  );

}


export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "flight:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateFlightSchema.parse(
      body
    );

  const flight =
    await flightService.updateFlight(
      Number(id),
      {

        ...data,

        departureDate:
          data.departureDate
            ? new Date(data.departureDate)
            : undefined,

        departureTime:
          data.departureTime
            ? new Date(data.departureTime)
            : undefined,

        arrivalTime:
          data.arrivalTime
            ? new Date(data.arrivalTime)
            : undefined,

        returnDate:
          data.returnDate
            ? new Date(data.returnDate)
            : undefined,

        returnDepartureTime:
          data.returnDepartureTime
            ? new Date(data.returnDepartureTime)
            : undefined,

        returnArrivalTime:
          data.returnArrivalTime
            ? new Date(data.returnArrivalTime)
            : undefined,

      }
    );

  return Response.json(
    flight
  );

}


export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "flight:delete"
  );

  const { id } =
    await params;

  await flightService.deleteFlight(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
