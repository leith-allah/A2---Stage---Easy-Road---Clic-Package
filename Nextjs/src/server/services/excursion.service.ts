
import { ExcursionRepository } from "@/server/repositories/interfaces/excursion.repository.interface";

import { ExcursionMapper } from "@/server/mappers/excursion.mapper";
import { ExcursionBuilder } from "@/server/builders/excursion.builder";

import { CreateExcursionDto } from "@/server/dto/excursion/create-excursion.dto";
import { UpdateExcursionDto } from "@/server/dto/excursion/update-excursion.dto";
import { ExcursionDto } from "@/server/dto/excursion/excursion.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class ExcursionService {

  constructor(

    private readonly repository: ExcursionRepository,

  ) {}

  async getAllExcursions(): Promise<ExcursionDto[]> {

    const excursions =
      await this.repository.findAll();

    return excursions.map(
      ExcursionMapper.toDto,
    );

  }

  async getExcursionById(
    id: number,
  ): Promise<ExcursionDto> {

    const excursion =
      await this.repository.findById(id);

    if (!excursion) {

      throw new NotFoundException(
        "Excursion introuvable",
      );

    }

    return ExcursionMapper.toDto(excursion);

  }

  async createExcursion(
    dto: CreateExcursionDto,
  ): Promise<ExcursionDto> {

    const aggregate =
      ExcursionBuilder.fromDto(dto);

    const created =
      await this.repository.createAggregate(
        aggregate,
      );

    return ExcursionMapper.toDto(created);

  }

  async updateExcursion(
    id: number,
    dto: UpdateExcursionDto,
  ): Promise<ExcursionDto> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Excursion introuvable",
      );

    }

    const aggregate =
      ExcursionBuilder.updateFromDto(
        existing,
        dto,
      );

    const updated =
      await this.repository.updateAggregate(
        aggregate,
      );

    return ExcursionMapper.toDto(updated);

  }

  async deleteExcursion(
    id: number,
  ): Promise<void> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Excursion introuvable",
      );

    }

    await this.repository.delete(id);

  }

}
