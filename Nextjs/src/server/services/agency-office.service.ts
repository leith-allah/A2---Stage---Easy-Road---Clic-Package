
import {
  agencyOfficeRepository,
}
from "@/server/repositories/agency-office.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const agencyOfficeService = {

  async getAllAgencyOffices() {

    return agencyOfficeRepository.findAll();

  },

  async getAgencyOfficeById(
    id: number
  ) {

    const office =
      await agencyOfficeRepository.findById(
        id
      );

    if (!office) {

      throw new NotFoundException(
        "Agency Office introuvable"
      );

    }

    return office;

  },

  async createAgencyOffice(
    data: {

      agencyId: number;

      code: string;

      type: string;

      country: string;

      city: string;

      address: string;

      approvalNumber: string;

      rib?: string;

      iban?: string;

    }
  ) {

    return agencyOfficeRepository.create(
      data
    );

  },

  async updateAgencyOffice(
    id: number,
    data: {

      type?: string;

      country?: string;

      city?: string;

      address?: string;

      rib?: string;

      iban?: string;

    }
  ) {

    await this.getAgencyOfficeById(
      id
    );

    return agencyOfficeRepository.update(
      id,
      data
    );

  },

  async deleteAgencyOffice(
    id: number
  ) {

    await this.getAgencyOfficeById(
      id
    );

    return agencyOfficeRepository.delete(
      id
    );

  },

};
