
import {
  transactionService,
}
from "@/server/services/transaction.service";

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

  const { id } =
    await params;

  const body =
    await request.json();

  const transaction =
    await transactionService.updateTransaction(
      Number(id),
      body
    );

  return Response.json(
    transaction
  );

}

export async function DELETE(
  _: Request,
  { params }: Params
) {

  const { id } =
    await params;

  await transactionService.deleteTransaction(
    Number(id)
  );

  return Response.json({

    success: true,

  });

}
