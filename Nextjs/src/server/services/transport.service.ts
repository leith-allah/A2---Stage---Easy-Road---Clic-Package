
import { transportRepository } from "@/server/repositories/transport.repository";

import { NotFoundException } from "@/server/utils/api-error";

export const transportService = {
  async getAllTransports() {
    return transportRepository.findAll();
  },

  async getTransportById(id: number) {
    const transport =
      await transportRepository.findById(id);

    if (!transport) {
      throw new NotFoundException(
        "Transport introuvable"
      );
    }

    return transport;
  },

  async createTransport(data: {
    route: string;
    company?: string;
  }) {
    return transportRepository.create(data);
  },

  async updateTransport(
    id: number,
    data: {
      route?: string;
      company?: string;
    }
  ) {
    await this.getTransportById(id);

    return transportRepository.update(
      id,
      data
    );
  },

  async deleteTransport(id: number) {
    await this.getTransportById(id);

    return transportRepository.delete(id);
  },
};
