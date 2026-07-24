
import { rechargeRequestService }
from "@/server/services/recharge-request.service";

export const rechargeRequestController = {

  async getAllRequests() {
    return rechargeRequestService.getAllRequests();
  },

  async getRequestById(
    id: number
  ) {

    return rechargeRequestService.getRequestById(
      id
    );
  },

  async getMyRequests() {
    return rechargeRequestService.getMyRequests();
  },

  async createRequest(
    data: {

      userId: number;

      amount: number;

      comment?: string;

    }
  ) {

    return rechargeRequestService.createRequest(
      data
    );

  },

  async approveRequest(
    id: number
  ) {

    return rechargeRequestService.approveRequest(
      id
    );

  },

  async rejectRequest(
    id: number
  ) {

    return rechargeRequestService.rejectRequest(
      id
    );

  },

};
