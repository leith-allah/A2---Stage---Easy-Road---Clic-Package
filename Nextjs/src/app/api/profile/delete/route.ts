
import { NextResponse } from "next/server";

import { getCurrentUserId }
from "@/server/auth/session";

import { userService }
from "@/server/services/user.service";


export async function PATCH() {

    const id =
        await getCurrentUserId();

    await userService.supprimerCompte(id);

    return NextResponse.json({
        success: true,
    });

}
