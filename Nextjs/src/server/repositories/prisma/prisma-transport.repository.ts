
import { prisma } from "@/server/db/prisma";

import { Transport } from "@/server/entities/transport.entity";

import { TransportMapper } from "@/server/mappers/transport.mapper";

import { TransportRepository } from "../interfaces/transport.repository.interface";

export class PrismaTransportRepository
implements TransportRepository {

  async findAll(): Promise<Transport[]> {

    const transports =
      await prisma.transport.findMany({

        orderBy: {

          trajet_transp: "asc",

        },

      });

    return transports.map(

      TransportMapper.toEntity

    );

  }

  async findById(

    id: number

  ): Promise<Transport | null> {

    const transport =
      await prisma.transport.findUnique({

        where: {

          id_transp: BigInt(id),

        },

      });

    if (!transport) {

      return null;

    }

    return TransportMapper.toEntity(
      transport
    );

  }

  async createAggregate(

    transport: Transport

  ): Promise<Transport> {

    const created =
      await prisma.transport.create({

        data: {

          trajet_transp:
            transport.route,

          societe_transp:
            transport.company,

        },

      });

    return TransportMapper.toEntity(
      created
    );

  }

  async updateAggregate(
    transport: Transport,
  ): Promise<Transport> {

    const updated =
      await prisma.transport.update({

        where: {

          id_transp: BigInt(transport.id),

        },

        data: {

          trajet_transp: transport.route,

          societe_transp: transport.company,

        }

      });

    return TransportMapper.toEntity(
      updated
    );

  }

  async delete(
    id: number,
  ): Promise<void> {

    await prisma.transport.delete({

      where: {
        id_transp: BigInt(id),
      },

    });

  }

}
