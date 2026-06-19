
import { PossedeDto }
from "@/server/dto/possede/possede.dto";

export class PossedeMapper {

  static toDto(
    data: any
  ): PossedeDto {

    return {

      id_pack:
        Number(data.id_pack),

      id_vol:
        Number(data.id_vol),

    };

  }

}
