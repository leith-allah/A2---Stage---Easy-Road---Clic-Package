
import { Transaction }
from "@/server/entities/transaction.entity";

import { TransactionDto }
from "@/server/dto/transaction/transaction.dto";

export class TransactionMapper {

  static toDto(
    entity: Transaction
  ): TransactionDto {

    return {

      id:
        entity.id,

      amount:
        entity.amount,

      type:
        entity.type,

      status:
        entity.status,

    };
  }

  static fromPrisma(
    transaction: any
  ): Transaction {

    return {

      id:
        Number(
          transaction.id_transac
        ),

      sourceWalletId:
        Number(
          transaction.id_portefeuille_source
        ),

      destinationWalletId:
        Number(
          transaction.id_portefeuille_dest
        ),

      amount:
        Number(
          transaction.montant_transac
        ),

      type:
        transaction.type_transac,

      status:
        transaction.statut_transac,

      createdAt:
        transaction.date_heure_transac,

    };
  }

}
