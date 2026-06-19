
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageRepository }
from "@/server/repositories/package.repository";

import { PACKAGE_STATUS }
from "@/server/constants/package-status";

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

  const result =
    await packageRepository.update(

      Number(id),

      {
        statut_pack:
          PACKAGE_STATUS.DRAFT,
      }

    );

  return Response.json(
    result
  );

}
