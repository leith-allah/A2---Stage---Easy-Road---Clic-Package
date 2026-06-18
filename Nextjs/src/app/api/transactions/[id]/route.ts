
import { transactionService }
from "@/server/services/transaction.service";

import { validateBody }
from "@/server/validations/validate-request";

import { updateTransactionSchema }
from "@/server/validations/transaction/update-transaction.validation";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


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
    "transaction:view"
  );

  const { id } =
    await params;

  const transaction =
    await transactionService.getTransactionById(
      Number(id)
    );

  return Response.json(
    transaction
  );

}

export async function PATCH(
  request: Request,
  { params }: Params
) {

  await requirePermission(
    "transaction:update"
  );

  const { id } =
    await params;

  const body =
    await validateBody(
      request,
      updateTransactionSchema
    );

  const transaction =
    await transactionService.updateTransaction(
      Number(id),
      body
    );

  return Response.json(
    transaction
  );

}
