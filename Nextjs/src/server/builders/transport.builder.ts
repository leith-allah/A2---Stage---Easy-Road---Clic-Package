
import { Transport }

from "@/server/entities/transport.entity";

import {

  CreateTransportDto,

}

from "@/server/dto/transport/create-transport.dto";

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

}
