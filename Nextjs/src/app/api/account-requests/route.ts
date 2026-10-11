
import { NextRequest, NextResponse } from "next/server";
import { AccountRequestService } from "@/server/services/account-request.service";
import { createAccountRequestSchema } from "@/server/validations/account-request/create-account-request.validation";

const service = new AccountRequestService();

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    // Validation Zod des règles métier
    const validationResult = createAccountRequestSchema.safeParse(rawBody);

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message || "Données invalides";
      return NextResponse.json({ message: firstError }, { status: 400 });
    }

    await service.creerDemande(validationResult.data);

    return NextResponse.json(
      { message: "Demande de création de compte transmise avec succès." },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur création demande compte:", error);

    const isConflict =
      error.message?.includes("existe déjà") ||
      error.message?.includes("déjà en cours");

    return NextResponse.json(
      { message: error.message || "Impossible d'envoyer la demande de création de compte." },
      { status: isConflict ? 409 : 500 }
    );
  }
}
