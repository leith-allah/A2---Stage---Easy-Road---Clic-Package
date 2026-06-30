
import { NextResponse } from "next/server";

import {
    deleteAuthCookie,
    deleteRefreshCookie,
} from "@/server/auth/cookies";

export async function POST() {

    await deleteAuthCookie();

    await deleteRefreshCookie();

    return NextResponse.json({
        success: true,
    });

}
