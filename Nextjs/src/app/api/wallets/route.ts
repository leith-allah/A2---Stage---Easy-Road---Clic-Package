
import {
  walletService,
}
from "@/server/services/wallet.service";

export async function GET() {

  const wallets =
    await walletService.getAllWallets();

  return Response.json(
    wallets
  );

}

export async function POST(
  request: Request
) {

  const body =
    await request.json();

  const wallet =
    await walletService.createWallet(
      body.userId
    );

  return Response.json(
    wallet,
    {
      status: 201,
    }
  );

}
