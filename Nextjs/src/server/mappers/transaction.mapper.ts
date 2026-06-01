
import { Transaction } from "@/server/entities/transaction.entity";
import { TransactionDto } from "@/server/dto/transaction/transaction.dto";

export class TransactionMapper {

  static toDto(
    entity: Transaction
  ): TransactionDto {

    return {
      id: entity.id,
      amount: entity.amount,
      type: entity.type,
      status: entity.status,
    };
  }

}
