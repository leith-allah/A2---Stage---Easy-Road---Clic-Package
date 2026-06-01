
import { NextRequest }
from "next/server";

import { packageService }
from "@/server/services/package.service";

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
