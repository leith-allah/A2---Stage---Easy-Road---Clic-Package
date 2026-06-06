
import { agencyService }
from "@/server/services/agency.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import {
  updateAgencySchema,
}
from "@/server/validations/agency/update-agency.validation";

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
    "agency:view"
  );

  const { id } =
    await params;

  const agency =
    await agencyService.getAgencyById(
      Number(id)
    );

  return Response.json(
    agency
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "agency:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateAgencySchema.parse(
      body
    );

  const agency =
    await agencyService.updateAgency(
      Number(id),
      data
    );

  return Response.json(
    agency
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "agency:delete"
  );

  const { id } =
    await params;

  await agencyService.deleteAgency(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
