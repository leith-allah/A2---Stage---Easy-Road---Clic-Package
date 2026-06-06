
import { NextRequest } from "next/server";

import { transportService }
from "@/server/services/transport.service";

export async function GET() {
  const transports =
    await transportService.getAllTransports();

  return Response.json(transports);
}

export async function POST(
  request: NextRequest
) {
  const body =
    await request.json();

  const transport =
    await transportService.createTransport({
      route: body.route,
      company: body.company,
    });

  return Response.json(
    transport,
    {
      status: 201,
    }
  );
}
