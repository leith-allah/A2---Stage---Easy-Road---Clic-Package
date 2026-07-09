
import { NextRequest, NextResponse } from "next/server";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { packageWizardService }
from "@/server/services/package-wizard.service";

import { CreatePackageWizardDto }
from "@/server/dto/package/create-package-wizard.dto";

export async function POST(
  request: NextRequest,
) {

  await requirePermission(
    "package:create",
  );

  const body: CreatePackageWizardDto =
    await request.json();

  const createdPackage =
    await packageWizardService.createPackage(
      body,
    );

  return NextResponse.json(
    {
      id: createdPackage.id,
    },
    {
      status: 201,
    },
  );

}
