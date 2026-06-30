
import { NextRequest, NextResponse }
from "next/server";

import { packageService }
from "@/server/services/package.service";

import { CreatePackageDto }
from "@/server/dto/package/create-package.dto";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET(
  request: NextRequest
) {

  await requirePermission(
    "package:view"
  );

  const searchParams =
    request.nextUrl.searchParams;

  const country =
    searchParams.get(
      "country"
    ) || undefined;

  const destination =
    searchParams.get(
      "destination"
    ) || undefined;

  const status =
    searchParams.get(
      "status"
    ) || undefined;

  const packages =
    await packageService.getPackages({

      country,
      destination,
      status,
    });

  return Response.json(
    packages
  );

}

export async function POST(
  request: NextRequest
) {
  
  await requirePermission(
    "package:create"
  );
  
  const body:
    CreatePackageDto =
      await request.json();

  const createdPackage =
    await packageService.createPackage(body);

  return NextResponse.json(
    {
      id: Number(createdPackage.id_pack),
    },
    {
      status: 201,
    }
  );
}
