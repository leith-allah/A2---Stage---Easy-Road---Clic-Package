
import { TransportRepository } from "@/server/repositories/interfaces/transport.repository.interface";

import { TransportMapper } from "@/server/mappers/transport.mapper";
import { TransportBuilder } from "@/server/builders/transport.builder";

import { CreateTransportDto } from "@/server/dto/transport/create-transport.dto";
import { UpdateTransportDto } from "@/server/dto/transport/update-transport.dto";
import { TransportDto } from "@/server/dto/transport/transport.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class TransportService {

  constructor(

    private readonly repository: TransportRepository,

  ) {}

  async getAllTransports(): Promise<TransportDto[]> {

    const transports =
      await this.repository.findAll();

    return transports.map(
      TransportMapper.toDto,
    );

  }

  async getTransportById(
    id: number,
  ): Promise<TransportDto> {

    const transport =
      await this.repository.findById(id);

    if (!transport) {

      throw new NotFoundException(
        "Transport introuvable",
      );

    }

    return TransportMapper.toDto(transport);

  }

  async createTransport(
    dto: CreateTransportDto,
  ): Promise<TransportDto> {

    const aggregate =
      TransportBuilder.fromDto(dto);

    const created =
      await this.repository.createAggregate(
        aggregate,
      );

    return TransportMapper.toDto(created);

  }

  async updateTransport(
    id: number,
    dto: UpdateTransportDto,
  ): Promise<TransportDto> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Transport introuvable",
      );

    }

    const aggregate =
      TransportBuilder.updateFromDto(
        existing,
        dto,
      );

    const updated =
      await this.repository.updateAggregate(
        aggregate,
      );

    return TransportMapper.toDto(updated);

  }

  async deleteTransport(
    id: number,
  ): Promise<void> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Transport introuvable",
      );

    }

    await this.repository.delete(id);

  }

}
