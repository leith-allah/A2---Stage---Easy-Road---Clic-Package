
import { UtiliseDto }
from "@/server/dto/utilise/utilise.dto";

export class UtiliseMapper {

  static toDto(
    data: any
  ): UtiliseDto {

    return {

      id_pack:
        Number(data.id_pack),

      id_transp:
        Number(data.id_transp),

    };

  }

}
