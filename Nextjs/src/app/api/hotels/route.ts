
import { NextRequest } from "next/server";

import { hotelService } from "@/server/services/hotel.service";

import { createHotelSchema } from "@/server/validations/hotel/create-hotel.validation";
import { updateHotelSchema } from "@/server/validations/hotel/update-hotel.validation";

import { requirePermission } from "@/server/middlewares/permission.middleware";


export async function GET() {
  await requirePermission("hotel:view");

  const hotels =
    await hotelService.getAllHotels();

  return Response.json(hotels);
}

export async function POST(
  request: NextRequest
) {
  await requirePermission("hotel:create");

  const body =
    await request.json();
  
  const data =
    createHotelSchema.parse(body);

  const hotel =
    await hotelService.createHotel(data);

  return Response.json(
    hotel,
    {
      status: 201,
    }
  );
}
