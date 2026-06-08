
import { NextRequest }
from "next/server";

import {
  transactionService,
}
from "@/server/services/transaction.service";

import {
  requirePermission,
}
from "@/server/middlewares/permission.middleware";

import {
  validateBody,
}
from "@/server/validations/validate-request";

import {
  createTransactionSchema,
}
from "@/server/validations/transaction/create-transaction.validation";


export async function GET() {

  await requirePermission(
    "transaction:view"
  );

  const transactions =
    await transactionService.getAllTransactions();

  return Response.json(
    transactions
  );
}

export async function POST(
  request: NextRequest
) {

  await requirePermission(
    "transaction:view"
  );

  const body =
    await validateBody(
      request,
      createTransactionSchema
    );

  const transaction =
    await transactionService.createTransaction({

      sourceWalletId:
        body.sourceWalletId,

      destinationWalletId:
        body.destinationWalletId,

      amount:
        body.amount,

      type:
        body.type,

      status:
        body.status,

    });

  return Response.json(
    transaction,
    {
      status: 201,
    }
  );
}
