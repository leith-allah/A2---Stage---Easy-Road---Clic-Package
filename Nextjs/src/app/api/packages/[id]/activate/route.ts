
import { packageService }
from "@/server/services/package.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{
    id: string;
  }>;

};


export async function PATCH(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "package:update"
  );

  const { id } =
    await params;

  const pkg =
    await packageService.activatePackage(
      Number(id)
    );

  return Response.json(
    pkg
  );

}
