
export type TransactionType =
  | "TOP_UP"
  | "PAYMENT"
  | "REFUND"
  | "TRANSFER";

export type Transaction = {
  id: number;

  type: TransactionType;

  amount: number;

  description: string;

  createdAt: string;
};
