
import { packageService } from "@/server/services/package.service";
import { packageWizardService } from "@/server/container/services/package-wizard.service";

import { requirePermission } from "@/server/middlewares/permission.middleware";

import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {

  await requirePermission("package:view");

  const searchParams = request.nextUrl.searchParams;

  const country =
    searchParams.get("country") || undefined;

  const destination =
    searchParams.get("destination") || undefined;

  const status =
    searchParams.get("status") || undefined;

  const packages =
    await packageService.getPackages({

      country,
      destination,
      status,

    });

  return Response.json(packages);

}


export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "package:create"
  );

  try {

    const body = await request.json() as CreatePackageWizardDto;

    const aggregate =
      await packageWizardService.createPackage(
        body
      );

    return NextResponse.json(

      {

        success: true,

        id: aggregate.id,

      },

      {

        status: 201,

      }

    );

  }

  catch(error){

    console.error(error);

    return NextResponse.json(

      {

        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Erreur interne",

      },

      {

        status: 500,

      }

    );

  }

}
