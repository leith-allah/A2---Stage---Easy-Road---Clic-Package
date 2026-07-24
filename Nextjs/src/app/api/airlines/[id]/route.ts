
import { NextResponse } from "next/server";

import { PrismaAirlineRepository } from "@/server/repositories/prisma/prisma-airline.repository";
import { AirlineService } from "@/server/services/airline.service";

const service = new AirlineService(
  new PrismaAirlineRepository(),
);

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const airline = await service.findById(Number(id));

  return NextResponse.json(airline);
}
