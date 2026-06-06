
import { excursionService }
from "@/server/services/excursion.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { updateExcursionSchema }
from "@/server/validations/excursion/update-excursion.validation";


type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "excursion:view"
  );

  const { id } =
    await params;

  const excursion =
    await excursionService.getExcursionById(
      Number(id)
    );

  return Response.json(
    excursion
  );
}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "excursion:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateExcursionSchema.parse(
      body
    );

  const excursion =
    await excursionService.updateExcursion(
      Number(id),
      data
    );

  return Response.json(
    excursion
  );
}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "excursion:delete"
  );

  const { id } =
    await params;

  await excursionService.deleteExcursion(
    Number(id)
  );

  return Response.json({

    success: true,

  });
}
