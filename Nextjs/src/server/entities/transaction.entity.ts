
export interface Transaction {

  id: number;

  sourceWalletId: number;

  destinationWalletId: number;

  amount: number;

  type: string;

  status: string;

  createdAt: Date;

}
