
import { transportRepository } from "@/server/repositories/transport.repository";

import { NotFoundException } from "@/server/utils/api-error";

import { TransportMapper }
from "@/server/mappers/transport.mapper";


export const transportService = {

  async getAllTransports() {

    const transports =
      await transportRepository.findAll();

    return transports.map(
      (transport) =>
        TransportMapper.toDto(
          transport
        )
    );

  },

  async getTransportById(id: number) {
    const transport =
      await transportRepository.findById(id);

    if (!transport) {
      throw new NotFoundException(
        "Transport introuvable"
      );
    }

    return TransportMapper.toDto(
      transport
    );
  },

  async createTransport(data: {
    route: string;
    company?: string;
  }) {

    const transport =
      await transportRepository.create(
        data
      );

    return TransportMapper.toDto(
      transport
    );
  },

  async updateTransport(
    id: number,
    data: {
      route?: string;
      company?: string;
    }
  ) {
    await this.getTransportById(id);

    const transport =
      await transportRepository.update(
        id,
        data
      );

    return TransportMapper.toDto(
      transport
    );
  },

  async deleteTransport(id: number) {
    await this.getTransportById(id);

    return transportRepository.delete(id);
  },
};
