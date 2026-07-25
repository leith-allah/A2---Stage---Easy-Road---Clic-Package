
import { NextRequest } from "next/server";

import { packageService } from "@/server/services/package.service";
import { packageWizardService } from "@/server/services/package-wizard.service";

import { UpdatePackageDto } from "@/server/dto/package/update-package.dto";
import { UpdatePackageWizardDto } from "@/server/dto/package/update-package-wizard.dto";

import { requirePermission } from "@/server/middlewares/permission.middleware";

// GET /api/packages/[id]
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
  await requirePermission("package:view");

  const { id } = await params;

  const pkg = await packageService.getPackageById(Number(id));

  return Response.json(pkg);
}

// PUT /api/packages/[id] - Mise à jour complète via le Wizard
export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  await requirePermission("package:update");

  const { id } = await params;

  const body: UpdatePackageWizardDto = await request.json();

  const updatedPackage = await packageWizardService.updatePackage(
    Number(id),
    body
  );

  return Response.json(updatedPackage);
}

// PATCH /api/packages/[id] - Mise à jour partielle directe du package
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
  await requirePermission("package:update");

  const { id } = await params;

  const body: UpdatePackageDto = await request.json();

  const updatedPackage = await packageService.updatePackage(
    Number(id),
    body
  );

  return Response.json(updatedPackage);
}

// DELETE /api/packages/[id]
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
  await requirePermission("package:delete");

  const { id } = await params;

  await packageService.deletePackage(Number(id));

  return Response.json({
    success: true,
  });
}
