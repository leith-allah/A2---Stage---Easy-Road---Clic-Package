
import {
  successResponse,
} from "@/server/api/responses/success";

import {
  walletService,
} from "@/server/services/wallet.service";

import {
  requirePermission,
} from "@/server/middlewares/permission.middleware";


type Params = {

  params: Promise<{
    id: string;
  }>;

};

export async function GET(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "wallet:view"
  );

  const { id } =
    await params;

  const wallet =
    await walletService.getWalletById(
      Number(id)
    );

  return successResponse(
    wallet
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  await requirePermission(
    "wallet:delete"
  );

  const { id } =
    await params;

  await walletService.deleteWallet(
    Number(id)
  );

  return successResponse(
    {
      deleted: true,
    },
    200,
    "Portefeuille supprimé"
  );

}
