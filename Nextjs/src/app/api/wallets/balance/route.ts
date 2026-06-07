
import { NextResponse }
from "next/server";

import { walletService }
from "@/server/services/wallet.service";

export async function GET() {

  const balance =
    await walletService.getBalance();

  return NextResponse.json(
    balance
  );
}
