
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageTransportService }
from "@/server/services/package-transport.service";

type Params = {

  params: Promise<{
    id: string;
    transportId: string;
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
    transportId,
  } =
    await params;

  await packageTransportService.removeTransportFromPackage(

    Number(id),

    Number(transportId)

  );

  return Response.json({

    success: true,

  });

}
