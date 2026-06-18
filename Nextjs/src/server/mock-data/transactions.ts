
import { Transaction } from "@/server/entities/transaction.entity";

import { TRANSACTION_STATUS } 
from "@/server/constants/transaction-status"; 

import { TRANSACTION_TYPE } 
from "@/server/constants/transaction-type"; 


export const transactions: Transaction[] = [
  {
    id: 1,
    sourceWalletId: 1,
    destinationWalletId: 2,
    amount: 1000,
    type: TRANSACTION_TYPE.TRANSFER,
    status: TRANSACTION_STATUS.SUCCESS,
    createdAt: new Date(),
  },
];
