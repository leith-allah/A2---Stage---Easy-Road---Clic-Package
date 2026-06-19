
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageExcursionService }
from "@/server/services/package-excursion.service";

type Params = {

  params: Promise<{
    id: string;
    excursionId: string;
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
    excursionId,
  } =
    await params;

  await packageExcursionService.removeExcursionFromPackage(

    Number(id),

    Number(excursionId)

  );

  return Response.json({

    success: true,

  });

}
