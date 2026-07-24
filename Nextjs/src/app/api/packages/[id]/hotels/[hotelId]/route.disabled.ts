
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageHotelService }
from "@/server/services/package-hotel.service";

type Params = {

  params: Promise<{
    id: string;
    hotelId: string;
  }>;

};

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "package:update"
  );

  const {
    id,
    hotelId,
  } =
    await params;

  await packageHotelService.removeHotelFromPackage(

    Number(id),

    Number(hotelId)

  );

  return Response.json({

    success: true,

  });

}
