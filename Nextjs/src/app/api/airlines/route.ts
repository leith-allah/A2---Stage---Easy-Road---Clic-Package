
import { NextResponse } from "next/server";

import { PrismaAirlineRepository } from "@/server/repositories/prisma/prisma-airline.repository";
import { AirlineService } from "@/server/services/airline.service";

const service = new AirlineService(
  new PrismaAirlineRepository(),
);

export async function GET() {
  const airlines = await service.findAll();

  return NextResponse.json(airlines);
}
