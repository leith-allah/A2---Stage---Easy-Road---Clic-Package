
export type WalletTransactionType =
  | "TOP_UP"
  | "PAYMENT"
  | "REFUND"
  | "TRANSFER";

export type WalletTransaction = {
  id: number;

  type: WalletTransactionType;

  amount: number;

  createdAt: string;

  description: string;
};

export type Wallet = {
  id: number;

  balance: number;

  currency: "DZD";

  transactions: WalletTransaction[];
};
