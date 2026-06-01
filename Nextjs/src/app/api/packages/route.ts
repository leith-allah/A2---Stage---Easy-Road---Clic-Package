
import { NextResponse }
from "next/server";

import { packageService }
from "@/server/services/package.service";

export async function GET() {

  const packages =
    await packageService.getPackages();

  return NextResponse.json(
    packages
  );
}
