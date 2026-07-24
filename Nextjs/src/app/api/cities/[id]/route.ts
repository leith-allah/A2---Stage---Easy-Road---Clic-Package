
import { NextResponse } from "next/server";

import { PrismaCityRepository } from "@/server/repositories/prisma/prisma-city.repository";
import { CityService } from "@/server/services/city.service";

const service = new CityService(
  new PrismaCityRepository(),
);

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const city = await service.findById(Number(id));

  return NextResponse.json(city);
}
