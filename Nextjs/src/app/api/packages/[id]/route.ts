
import { NextRequest }
from "next/server";

import { packageService }
from "@/server/services/package.service";

import { UpdatePackageDto }
from "@/server/dto/package/update-package.dto";


export async function GET(
  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const pkg =
    await packageService.getPackageById(
      Number(id)
    );

  return Response.json(
    pkg
  );
}



export async function PATCH(
  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  const body:
    UpdatePackageDto =
      await request.json();

  const updatedPackage =
    await packageService.updatePackage(
      Number(id),
      body
    );

  return Response.json(
    updatedPackage
  );
}


export async function DELETE(

  request: NextRequest,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {

  const { id } =
    await params;

  await packageService.deletePackage(
    Number(id)
  );

  return Response.json({
    success: true,
  });
}
