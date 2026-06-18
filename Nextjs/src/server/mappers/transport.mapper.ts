
import { TransportDto }
from "@/server/dto/transport/transport.dto";

export class TransportMapper {

  static toDto(
    transport: any
  ): TransportDto {

    return {

      id:
        Number(
          transport.id_transp
        ),

      route:
        transport.trajet_transp,

      company:
        transport.societe_transp,

    };

  }

}
