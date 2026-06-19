
import { ProposeDto }
from "@/server/dto/propose/propose.dto";

export class ProposeMapper {

  static toDto(
    data: any
  ): ProposeDto {

    return {

      id_pack:
        Number(data.id_pack),

      id_exc:
        Number(data.id_exc),

    };

  }

}
