
import { prisma } from "@/server/db/prisma";

import { Hotel } from "@/server/entities/hotel.entity";

import { HotelRepository } from "../interfaces/hotel.repository.interface";

import { HotelMapper } from "@/server/mappers/hotel.mapper";

export class PrismaHotelRepository implements HotelRepository {

  async findAll(): Promise<Hotel[]> {

    const hotels = await prisma.hotel.findMany({

      orderBy: {

        nom_hot: "asc",

      },

    });

    return hotels.map(HotelMapper.toEntity);

  }

  async findById(id: number): Promise<Hotel | null> {

    const hotel = await prisma.hotel.findUnique({

      where: {

        id_hot: BigInt(id),

      },

    });

    if (!hotel) {

      return null;

    }

    return HotelMapper.toEntity(hotel);

  }

  async createAggregate(hotel: Hotel): Promise<Hotel> {

    const created = await prisma.hotel.create({

      data: {

        nom_hot: hotel.name,

        pays_hot: hotel.country,

        ville_hot: hotel.city,

        adresse_hot: hotel.address,

        nb_etoiles_hot: hotel.stars,

      },

    });

    return HotelMapper.toEntity(created);

  }

  async updateAggregate(
    hotel: Hotel,
  ): Promise<Hotel> {

    const updated = await prisma.hotel.update({

      where: {

        id_hot: BigInt(hotel.id),

      },

      data: {

        nom_hot: hotel.name,

        pays_hot: hotel.country,

        ville_hot: hotel.city,

        adresse_hot: hotel.address,

        nb_etoiles_hot: hotel.stars,

      }

    });

    return HotelMapper.toEntity(updated);

  }

  async delete(
    id: number,
  ): Promise<void> {

    await prisma.hotel.delete({

      where: {
        id_hot: BigInt(id),
      },

    });

  }

}
