
import { NextRequest, NextResponse } from "next/server";

import { AccountRequestService }
from "@/server/services/account-request.service";

import { getCurrentUser }
from "@/server/auth/current-user";


const service =
    new AccountRequestService();

/**
 * PATCH /api/account-requests/:id/accept
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
            TODO :

            récupérer l'ID de l'administrateur
            depuis le JWT.

            En attendant :
        */

        const currentUser = await getCurrentUser();

        const administrateurId = BigInt(currentUser.id);

        const utilisateur =

            await service.accepterDemande(

                BigInt(id),

                administrateurId

            );

        return NextResponse.json(

            {

                success: true,

            },

            {

                status: 200,

            }

        );

    }

    catch (error) {

        console.error(error);

        if (error instanceof Error) {

            return NextResponse.json(

                {

                    message: error.message,

                },

                {

                    status: 409,

                }

            );

        }

        return NextResponse.json(

            {

                message:
                    "Impossible d'accepter cette demande.",

            },

            {

                status: 500,

            }

        );

    }

}
