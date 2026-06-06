
import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { agencyOfficeService }
from "@/server/services/agency-office.service";

import {
  updateAgencyOfficeSchema,
}
from "@/server/validations/agency-office/update-agency-office.validation";

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
    "agency-office:view"
  );

  const { id } =
    await params;

  const office =
    await agencyOfficeService.getAgencyOfficeById(
      Number(id)
    );

  return Response.json(
    office
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "agency-office:update"
  );

  const { id } =
    await params;

  const body =
    await request.json();

  const data =
    updateAgencyOfficeSchema.parse(
      body
    );

  const office =
    await agencyOfficeService.updateAgencyOffice(
      Number(id),
      data
    );

  return Response.json(
    office
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "agency-office:delete"
  );

  const { id } =
    await params;

  await agencyOfficeService.deleteAgencyOffice(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
