
import { NextRequest } from "next/server";

import { hotelController } from "@/server/container/controllers/hotel.controller";

import { updateHotelSchema } from "@/server/validations/hotel/update-hotel.validation";

import { requirePermission } from "@/server/middlewares/permission.middleware";

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
    "hotel:view"
  );

  const { id } =
    await params;

  const hotel =
    await hotelController.getById(

      Number(id)

    );

  return Response.json(
    hotel
  );

}

export async function PATCH(

  request: NextRequest,

  { params }: Params

) {

  await requirePermission(
    "hotel:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateHotelSchema.parse(
      body
    );

  const hotel =
    await hotelController.update(

      Number(id),

      data

    );

  return Response.json(
    hotel
  );

}

export async function DELETE(

  _: NextRequest,

  { params }: Params

) {

  await requirePermission(
    "hotel:delete"
  );

  const { id } =
    await params;

  const hotel =
    await hotelController.delete(

      Number(id)

    );

  return Response.json(
    hotel
  );

}
