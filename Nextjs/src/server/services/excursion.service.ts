
import {
  excursionRepository,
}
from "@/server/repositories/excursion.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const excursionService = {

  async getAllExcursions() {

    return excursionRepository.findAll();

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

    return excursion;

  },

  async createExcursion(
    data: {

      nom_exc: string;

      lieu_exc: string;

      description_exc: string;

    }
  ) {

    return excursionRepository.create(
      data
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

    return excursionRepository.update(
      id,
      data
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
