
import { NextRequest }
from "next/server";

import { flightController }
from "@/server/container";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

import { createFlightSchema }
from "@/server/validations/flight/create-flight.validation";

export async function GET() {

    await requirePermission(
        "flight:view"
    );

    const flights =
        await flightController.findAll();

    return Response.json(flights);

}

export async function POST(
    request: NextRequest
) {

    await requirePermission(
        "flight:create"
    );

    const body =
        await request.json();

    const dto =
        createFlightSchema.parse(body);

    const flight =
        await flightController.create(dto);

    return Response.json(

        flight,

        {
            status: 201,
        }

    );

}
