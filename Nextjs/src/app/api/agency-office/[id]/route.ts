
import {
  agencyOfficeService,
}
from "@/server/services/agency-office.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

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

  const { id } =
    await params;

  const body =
    await request.json();

  const office =
    await agencyOfficeService.updateAgencyOffice(
      Number(id),
      body
    );

  return Response.json(
    office
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await agencyOfficeService.deleteAgencyOffice(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
