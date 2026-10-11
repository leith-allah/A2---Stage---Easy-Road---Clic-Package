
import { NextResponse } from "next/server";
import { validateBody } from "@/server/validations/validate-request";
import { topupSchema } from "@/server/validations/wallet/topup.validation";
import { walletService } from "@/server/services/wallet.service";

export async function POST(request: Request) {
  try {
    const data = await validateBody(request, topupSchema);
    const result = await walletService.topup(data.amount, data.comment);

    return NextResponse.json({
      success: true,
      message: "Demande de rechargement envoyée avec succès.",
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Erreur lors de la demande" },
      { status: 400 }
    );
  }
}
