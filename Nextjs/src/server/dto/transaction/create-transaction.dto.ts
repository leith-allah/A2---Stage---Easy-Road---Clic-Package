
export interface CreateTransactionDto {
  sourceWalletId: number;
  destinationWalletId: number;
  amount: number;
  type: string;
  status: string;
}
