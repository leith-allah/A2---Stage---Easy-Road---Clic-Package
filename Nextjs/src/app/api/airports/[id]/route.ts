
import { NextResponse } from "next/server";

import { PrismaAirportRepository } from "@/server/repositories/prisma/prisma-airport.repository";
import { AirportService } from "@/server/services/airport.service";

const service = new AirportService(
  new PrismaAirportRepository(),
);

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const airport = await service.findById(Number(id));

  return NextResponse.json(airport);
}
