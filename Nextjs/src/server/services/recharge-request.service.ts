
import {
  rechargeRequestRepository,
}
from "@/server/repositories/recharge-request.repository";

import {
  NotFoundException,
}
from "@/server/utils/api-error";

export const rechargeRequestService = {

  async getAllRequests() {

    return rechargeRequestRepository.findAll();

  },

  async getRequestById(
    id: number
  ) {

    const request =
      await rechargeRequestRepository.findById(
        id
      );

    if (!request) {

      throw new NotFoundException(
        "Demande introuvable"
      );

    }

    return request;

  },

  async createRequest(
    data: {

      userId: number;

      amount: number;

      comment?: string;

    }
  ) {

    return rechargeRequestRepository.create(
      data
    );

  },

  async updateRequest(
    id: number,
    data: {

      status?: string;

      comment?: string;

    }
  ) {

    await this.getRequestById(
      id
    );

    return rechargeRequestRepository.update(
      id,
      data
    );

  },

  async deleteRequest(
    id: number
  ) {

    await this.getRequestById(
      id
    );

    return rechargeRequestRepository.delete(
      id
    );

  },

};
