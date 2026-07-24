
import { AirportRepository } from "@/server/repositories/interfaces/airport.repository.interface";

import { AirportMapper } from "@/server/mappers/airport.mapper";

import { AirportDto } from "@/server/dto/airport/airport.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class AirportService {

  constructor(
    private readonly repository: AirportRepository,
  ) {}

  async findAll(): Promise<AirportDto[]> {

    const airports =
      await this.repository.findAll();

    return airports.map(
      AirportMapper.toDto,
    );

  }

  async findById(
    id: number,
  ): Promise<AirportDto> {

    const airport =
      await this.repository.findById(id);

    if (!airport) {

      throw new NotFoundException(
        "Aéroport introuvable",
      );

    }

    return AirportMapper.toDto(
      airport,
    );

  }

}
