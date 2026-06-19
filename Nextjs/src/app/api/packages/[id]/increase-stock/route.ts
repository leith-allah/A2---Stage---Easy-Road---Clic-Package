
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
  request: Request,
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
    await packageService.increaseStock(
      Number(id),
      body.quantity
    );

  return Response.json(
    result
  );

}
