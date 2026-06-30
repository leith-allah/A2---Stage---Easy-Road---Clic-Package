
import { NextRequest, NextResponse } from "next/server";

import { AccountRequestService }
from "@/server/services/account-request.service";

import { getCurrentUser }
from "@/server/auth/current-user";


const service =
    new AccountRequestService();

/**
 * PATCH /api/account-requests/:id/reject
 */
export async function PATCH(
    request: NextRequest,
    {
        params,
    }: {
        params: Promise<{
            id: string;
        }>;
    }
) {

    try {

        const { id } =
            await params;

        /*
            TODO

            Récupérer l'ID de l'administrateur
            connecté depuis le JWT.

            Temporairement :
        */

        const currentUser = await getCurrentUser();

        const administrateurId = BigInt(currentUser.id);

        await service.refuserDemande(

            BigInt(id),

            administrateurId

        );

        return NextResponse.json(

            {

                message:
                    "Demande refusée.",

            },

            {

                status: 200,

            }

        );

    }

    catch (error) {

        console.error(error);

        return NextResponse.json(

            {

                message:
                    "Impossible de refuser cette demande.",

            },

            {

                status: 500,

            }

        );

    }

}
