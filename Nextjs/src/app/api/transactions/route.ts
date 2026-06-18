
/*import { NextRequest }
from "next/server";
*/

import { transactionService }
from "@/server/services/transaction.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";

/*
import { validateBody }
from "@/server/validations/validate-request";

import { createTransactionSchema }
from "@/server/validations/transaction/create-transaction.validation";
*/

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
