
import { NextRequest, NextResponse } from "next/server";
import { AccountRequestService } from "@/server/services/account-request.service";

const service = new AccountRequestService();

/**
 * GET /api/account-request/:id
 */
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params;

        const demande = await service.getDemandeById(BigInt(id));

        if (!demande) {

            return NextResponse.json(
                { message: "Demande introuvable." },
                { status: 404 }
            );

        }

        return NextResponse.json(demande);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Erreur lors de la récupération." },
            { status: 500 }
        );

    }

}

/**
 * PATCH /api/account-request/:id
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params;
        const body = await request.json();

        const demande = await service.modifierDemande(
            BigInt(id),
            body
        );

        return NextResponse.json(demande);

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Erreur lors de la modification." },
            { status: 500 }
        );

    }

}

/**
 * DELETE /api/account-request/:id
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    try {

        const { id } = await params;

        await service.supprimerDemande(BigInt(id));

        return NextResponse.json({
            message: "Demande supprimée."
        });

    } catch (error) {

        console.error(error);

        return NextResponse.json(
            { message: "Erreur lors de la suppression." },
            { status: 500 }
        );

    }

}
