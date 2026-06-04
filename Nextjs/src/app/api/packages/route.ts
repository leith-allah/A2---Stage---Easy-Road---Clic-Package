
import { NextRequest, NextResponse }
from "next/server";

import { packageService }
from "@/server/services/package.service";

import { CreatePackageDto }
from "@/server/dto/package/create-package.dto";


export async function GET() {

  const packages =
    await packageService.getPackages();

  return NextResponse.json(
    packages
  );
}

export async function POST(
  request: NextRequest
) {

  const body:
    CreatePackageDto =
      await request.json();

  const createdPackage =
    await packageService.createPackage(
      body
    );

  return Response.json(
    createdPackage,
    {
      status: 201,
    }
  );
}
