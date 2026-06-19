
import { packageService }
from "@/server/services/package.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

export async function PATCH() {

  await requirePermission(
    "package:update"
  );

  const result =
    await packageService.publishAllDraftPackages();

  return Response.json(
    result
  );

}
