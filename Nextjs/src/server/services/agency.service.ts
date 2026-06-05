
import {
  agencyRepository,
}
from "@/server/repositories/agency.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const agencyService = {

  async getAllAgencies() {

    return agencyRepository.findAll();

  },

  async getAgencyById(
    id: number
  ) {

    const agency =
      await agencyRepository.findById(
        id
      );

    if (!agency) {

      throw new NotFoundException(
        "Agence introuvable"
      );

    }

    return agency;

  },

  async createAgency(
    data: {

      mle_agence: string;

      nom_agence: string;

      dc_agence: Date;

      sj_agence: string;

    }
  ) {

    return agencyRepository.create(
      data
    );

  },

  async updateAgency(
    id: number,
    data: any
  ) {

    await this.getAgencyById(
      id
    );

    return agencyRepository.update(
      id,
      data
    );

  },

  async deleteAgency(
    id: number
  ) {

    await this.getAgencyById(
      id
    );

    return agencyRepository.delete(
      id
    );

  },

};
