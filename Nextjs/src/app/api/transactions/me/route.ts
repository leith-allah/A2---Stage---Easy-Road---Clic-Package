
import { successResponse }
from "@/server/api/responses/success";

import { transactionService }
from "@/server/services/transaction.service";

import { requirePermission }
from "@/server/middlewares/permission.middleware";


export async function GET() {

  await requirePermission(
    "transaction:view"
  );

  const transactions =
    await transactionService.getMyTransactions();

  return successResponse(
    transactions
  );

}
