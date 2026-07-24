
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { PrismaPackageRepository }
from "@/server/repositories/prisma/prisma-package.repository";

const packageRepository =
    new PrismaPackageRepository();

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
    await packageRepository.unpublish(
      Number(id)
    );

  return Response.json(
    result
  );

}
