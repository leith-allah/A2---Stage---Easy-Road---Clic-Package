
import { NextResponse } from "next/server";

import { PrismaAirportRepository } from "@/server/repositories/prisma/prisma-airport.repository";
import { AirportService } from "@/server/services/airport.service";

const service = new AirportService(
  new PrismaAirportRepository(),
);

export async function GET() {
  const airports = await service.findAll();

  return NextResponse.json(airports);
}
