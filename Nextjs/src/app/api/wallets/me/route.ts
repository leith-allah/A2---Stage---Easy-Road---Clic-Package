
import { successResponse } from "@/server/api/responses/success";
import { walletService } from "@/server/services/wallet.service";

export async function GET() {
  const summary = await walletService.getWalletSummary();
  return successResponse(summary);
}
