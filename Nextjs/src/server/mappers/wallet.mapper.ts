
import { Wallet } from "@/server/entities/wallet.entity";
import { WalletDto } from "@/server/dto/wallet/wallet.dto";

export class WalletMapper {

  static toDto(
    entity: Wallet
  ): WalletDto {

    return {
      id: entity.id,
      balance: entity.balance,
    };
  }

}
