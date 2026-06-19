
import { HebergeDto }
from "@/server/dto/heberge/heberge.dto";

export class HebergeMapper {

  static toDto(
    data: any
  ): HebergeDto {

    return {

      id_pack:
        Number(data.id_pack),

      id_hot:
        Number(data.id_hot),

    };

  }

}
