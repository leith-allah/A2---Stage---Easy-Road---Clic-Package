
import { NextResponse } from "next/server";
import { validateBody } from "@/server/validations/validate-request";
import { transferSchema } from "@/server/validations/wallet/transfer.validation";
import { walletService } from "@/server/services/wallet.service";

export async function POST(request: Request) {
  try {
    const data = await validateBody(request, transferSchema);
    const result = await walletService.transfer(data.recipient, data.amount, data.note);

    return NextResponse.json({
      success: true,
      message: `Virement de ${data.amount} DZD effectué avec succès.`,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Erreur lors du virement" },
      { status: 400 }
    );
  }
}
