
import { NextRequest }
from "next/server";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageExcursionService }
from "@/server/services/package-excursion.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: NextRequest,
  { params }: Params
) {

  await requirePermission(
    "package:view"
  );

  const { id } =
    await params;

  const excursions =
    await packageExcursionService.getExcursionsByPackage(
      Number(id)
    );

  return Response.json(
    excursions
  );

}

export async function POST(
  request: NextRequest,
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
    await packageExcursionService.addExcursionToPackage(

      Number(id),

      Number(
        body.excursionId
      )

    );

  return Response.json(
    result,
    {
      status: 201,
    }
  );

}
