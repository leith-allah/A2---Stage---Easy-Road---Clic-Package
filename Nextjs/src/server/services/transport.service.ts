
import { TransportRepository } from "@/server/repositories/interfaces/transport.repository.interface";

import { TransportMapper } from "@/server/mappers/transport.mapper";

import { CreateTransportDto } from "@/server/dto/transport/create-transport.dto";

import { UpdateTransportDto } from "@/server/dto/transport/update-transport.dto";

import { Transport } from "@/server/entities/transport.entity";

import { NotFoundException } from "@/server/utils/api-error";

export class TransportService {

  constructor(

    private readonly repository: TransportRepository,

  ) {}

  async getAllTransports() {

    const transports =

      await this.repository.findAll();

    return transports.map(

      transport => TransportMapper.toDto(transport)

    );

  }

  async getTransportById(

    id: number,

  ) {

    const transport =

      await this.repository.findById(id);

    if (!transport) {

      throw new NotFoundException(

        "Transport introuvable"

      );

    }

    return TransportMapper.toDto(transport);

  }

  async createTransport(

    dto: CreateTransportDto,

  ) {

    const transport = new Transport(

      0,

      dto.route,

      dto.company ?? null,

    );

    const created =

      await this.repository.create(transport);

    return TransportMapper.toDto(created);

  }

  async updateTransport(

    id: number,

    dto: UpdateTransportDto,

  ) {

    const exists =

      await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Transport introuvable"

      );

    }

    const updated =

      await this.repository.update(

        id,

        dto,

      );

    return TransportMapper.toDto(updated);

  }

  async deleteTransport(

    id: number,

  ) {

    const exists =

      await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Transport introuvable"

      );

    }

    const deleted =

      await this.repository.delete(id);

    return TransportMapper.toDto(deleted);

  }

}
