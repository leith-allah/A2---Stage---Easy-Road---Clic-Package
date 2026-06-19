import { NextRequest }
from "next/server";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageHotelService }
from "@/server/services/package-hotel.service";

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

  const hotels =
    await packageHotelService.getHotelsByPackage(
      Number(id)
    );

  return Response.json(
    hotels
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
    await packageHotelService.addHotelToPackage(

      Number(id),

      Number(
        body.hotelId
      )

    );

  return Response.json(
    result,
    {
      status: 201,
    }
  );

}
