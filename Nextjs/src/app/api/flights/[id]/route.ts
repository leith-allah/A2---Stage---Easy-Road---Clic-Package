
import { NextRequest } from "next/server";

import { flightController } from "@/server/container";

import { requirePermission } from "@/server/middlewares/permission.middleware";

import { updateFlightSchema } from "@/server/validations/flight/update-flight.validation";

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
    "flight:view"
  );

  const { id } =
    await params;

  const flight =
    await flightController.findById(
      Number(id)
    );

  return Response.json(
    flight
  );

}

export async function PATCH(
  request: NextRequest,
  { params }: Params
) {

  await requirePermission(
    "flight:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const dto =
    updateFlightSchema.parse(
      body
    );

  const flight =
    await flightController.update(

      Number(id),

      dto

    );

  return Response.json(
    flight
  );

}

export async function DELETE(
  _: NextRequest,
  { params }: Params
) {

  await requirePermission(
    "flight:delete"
  );

  const { id } =
    await params;

  await flightController.delete(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
