
import { excursionRepository }
from "@/server/repositories/excursion.repository";

import { NotFoundException }
from "@/server/utils/api-error";

import { ExcursionMapper }
from "@/server/mappers/excursion.mapper";


export const excursionService = {

  async getAllExcursions() {

    const excursions =
      await excursionRepository.findAll();

    return excursions.map(
      (excursion) =>
        ExcursionMapper.toDto(
          excursion
        )
    );

  },

  async getExcursionById(
    id: number
  ) {

    const excursion =
      await excursionRepository.findById(
        id
      );

    if (!excursion) {

      throw new NotFoundException(
        "Excursion introuvable"
      );

    }

    return ExcursionMapper.toDto(
      excursion
    );

  },

  async createExcursion(
    data: {

      nom_exc: string;

      lieu_exc: string;

      description_exc: string;

    }
  ) {

    const excursion =
      await excursionRepository.create(
        data
      );

    return ExcursionMapper.toDto(
      excursion
    );

  },

  async updateExcursion(
    id: number,
    data: {

      nom_exc?: string;

      lieu_exc?: string;

      description_exc?: string;

    }
  ) {

    await this.getExcursionById(
      id
    );

    const excursion =
      await excursionRepository.update(
        id,
        data
      );

    return ExcursionMapper.toDto(
      excursion
    );

  },

  async deleteExcursion(
    id: number
  ) {

    await this.getExcursionById(
      id
    );

    return excursionRepository.delete(
      id
    );

  },

};
