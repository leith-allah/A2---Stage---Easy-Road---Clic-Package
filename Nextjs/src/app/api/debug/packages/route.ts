
import { NextResponse } from "next/server";

import {

    packageRepository,

}

from "@/server/container/repositories/package.repository";

export async function GET() {

    const packages =

        await packageRepository.findAll();

    return NextResponse.json(packages);

}
