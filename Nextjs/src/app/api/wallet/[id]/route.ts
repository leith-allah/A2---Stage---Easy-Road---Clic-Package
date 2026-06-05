
import {
  walletService,
}
from "@/server/services/wallet.service";

type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  const wallet =
    await walletService.getWalletById(
      Number(id)
    );

  return Response.json(
    wallet
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await walletService.deleteWallet(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
