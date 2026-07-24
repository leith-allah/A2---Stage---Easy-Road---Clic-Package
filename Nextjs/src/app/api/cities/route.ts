
import { NextResponse } from "next/server";

import { PrismaCityRepository } from "@/server/repositories/prisma/prisma-city.repository";
import { CityService } from "@/server/services/city.service";

const service = new CityService(
  new PrismaCityRepository(),
);

export async function GET() {
  const cities = await service.findAll();

  return NextResponse.json(cities);
}
