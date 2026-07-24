
import { CityRepository } from "@/server/repositories/interfaces/city.repository.interface";

import { CityMapper } from "@/server/mappers/city.mapper";

import { CityDto } from "@/server/dto/city/city.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class CityService {

  constructor(
    private readonly repository: CityRepository,
  ) {}

  async findAll(): Promise<CityDto[]> {

    const cities =
      await this.repository.findAll();

    return cities.map(
      CityMapper.toDto,
    );

  }

  async findById(
    id: number,
  ): Promise<CityDto> {

    const city =
      await this.repository.findById(id);

    if (!city) {

      throw new NotFoundException(
        "Ville introuvable",
      );

    }

    return CityMapper.toDto(
      city,
    );

  }

}
