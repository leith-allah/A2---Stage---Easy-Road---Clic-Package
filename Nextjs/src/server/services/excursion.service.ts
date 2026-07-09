
import { ExcursionRepository } from "@/server/repositories/interfaces/excursion.repository.interface";

import { Excursion } from "@/server/entities/excursion.entity";

import { ExcursionMapper } from "@/server/mappers/excursion.mapper";

import { CreateExcursionDto } from "@/server/dto/excursion/create-excursion.dto";

import { UpdateExcursionDto } from "@/server/dto/excursion/update-excursion.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class ExcursionService {

  constructor(

    private readonly repository: ExcursionRepository,

  ) {}

  async getAllExcursions() {

    const excursions =

      await this.repository.findAll();

    return excursions.map(

      excursion =>

        ExcursionMapper.toDto(excursion),

    );

  }

  async getExcursionById(

    id: number,

  ) {

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

  ) {

    const excursion = new Excursion(

      0,

      dto.name,

      dto.location,

      dto.description,

    );

    const created =

      await this.repository.create(excursion);

    return ExcursionMapper.toDto(created);

  }

  async updateExcursion(

    id: number,

    dto: UpdateExcursionDto,

  ) {

    const exists =

      await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Excursion introuvable",

      );

    }

    const updated =

      await this.repository.update(

        id,

        dto,

      );

    return ExcursionMapper.toDto(updated);

  }

  async deleteExcursion(

    id: number,

  ) {

    const exists =

      await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Excursion introuvable",

      );

    }

    const deleted =

      await this.repository.delete(id);

    return ExcursionMapper.toDto(deleted);

  }

}
