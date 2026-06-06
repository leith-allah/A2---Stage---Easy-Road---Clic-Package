
import {
  agencyOfficeService,
}
from "@/server/services/agency-office.service";

export async function GET() {

  const offices =
    await agencyOfficeService.getAllAgencyOffices();

  return Response.json(
    offices
  );

}

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const office =
    await agencyOfficeService.createAgencyOffice({

      agencyId:
        body.agencyId,

      code:
        body.code,

      type:
        body.type,

      country:
        body.country,

      city:
        body.city,

      address:
        body.address,

      approvalNumber:
        body.approvalNumber,

      rib:
        body.rib,

      iban:
        body.iban,

    });

  return Response.json(
    office,
    {
      status: 201,
    }
  );

}
