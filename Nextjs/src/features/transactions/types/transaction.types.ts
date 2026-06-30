
export type TransactionType =
  | "TOP_UP"
  | "PAYMENT"
  | "REFUND"
  | "TRANSFER";

export type Transaction = {

  id: number;

  amount: number;

  type: string;

  status: string;

};
