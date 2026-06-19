
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageFlightService }
from "@/server/services/package-flight.service";

type Params = {

  params: Promise<{
    id: string;
    flightId: string;
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
    flightId,
  } =
    await params;

  await packageFlightService.removeFlightFromPackage(

    Number(id),

    Number(flightId)

  );

  return Response.json({

    success: true,

  });

}
