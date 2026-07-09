
import { TransportService } from "@/server/services/transport.service";

import { CreateTransportDto } from "@/server/dto/transport/create-transport.dto";

import { UpdateTransportDto } from "@/server/dto/transport/update-transport.dto";

export class TransportController {

  constructor(

    private readonly service: TransportService,

  ) {}

  async getAll() {

    return this.service.getAllTransports();

  }

  async getById(

    id: number,

  ) {

    return this.service.getTransportById(id);

  }

  async create(

    dto: CreateTransportDto,

  ) {

    return this.service.createTransport(dto);

  }

  async update(

    id: number,

    dto: UpdateTransportDto,

  ) {

    return this.service.updateTransport(

      id,

      dto,

    );

  }

  async delete(

    id: number,

  ) {

    return this.service.deleteTransport(id);

  }

}
