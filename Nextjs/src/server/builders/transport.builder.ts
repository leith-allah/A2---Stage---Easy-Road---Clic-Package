
import { Transport }
from "@/server/entities/transport.entity";

import { CreateTransportDto }
from "@/server/dto/transport/create-transport.dto";

import { UpdateTransportDto }
from "@/server/dto/transport/update-transport.dto";


export class TransportBuilder {

  static fromDto(

    dto: CreateTransportDto,

  ): Transport {

    return new Transport(

      0,

      dto.route,

      dto.company ?? null,

    );

  }

  static updateFromDto(

      existing: Transport,

      dto: UpdateTransportDto,

  ): Transport {

      return new Transport(

          existing.id,

          dto.route
              ?? existing.route,

          dto.company
              ?? existing.company,

      );

  }

}
