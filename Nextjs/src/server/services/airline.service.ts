
import { AirlineRepository } from "@/server/repositories/interfaces/airline.repository.interface";

import { AirlineMapper } from "@/server/mappers/airline.mapper";

import { AirlineDto } from "@/server/dto/airline/airline.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class AirlineService {

  constructor(
    private readonly repository: AirlineRepository,
  ) {}

  async findAll(): Promise<AirlineDto[]> {

    const airlines =
      await this.repository.findAll();

    return airlines.map(
      AirlineMapper.toDto,
    );

  }

  async findById(
    id: number,
  ): Promise<AirlineDto> {

    const airline =
      await this.repository.findById(id);

    if (!airline) {

      throw new NotFoundException(
        "Compagnie aérienne introuvable",
      );

    }

    return AirlineMapper.toDto(
      airline,
    );

  }

}
