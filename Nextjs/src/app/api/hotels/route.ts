
import { NextRequest } from "next/server";

import { hotelController } from "@/server/container/controllers/hotel.controller";

import { createHotelSchema } from "@/server/validations/hotel/create-hotel.validation";

import { requirePermission } from "@/server/middlewares/permission.middleware";

export async function GET() {

  await requirePermission(
    "hotel:view"
  );

  const hotels =
    await hotelController.getAll();

  return Response.json(
    hotels
  );

}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "hotel:create"
  );

  const body =
    await request.json();

  const data =
    createHotelSchema.parse(
      body
    );

  const hotel =
    await hotelController.create(
      data
    );

  return Response.json(

    hotel,

    {

      status: 201,

    }

  );

}
