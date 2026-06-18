
import { hotelRepository }
from "@/server/repositories/hotel.repository";

import { NotFoundException }
from "@/server/utils/api-error";

import { HotelMapper }
from "@/server/mappers/hotel.mapper";


export const hotelService = {

  async getAllHotels() {

    const hotels =
      await hotelRepository.findAll();

    return hotels.map(
      (hotel) =>
        HotelMapper.toDto(
          hotel
        )
    );
  },

  async getHotelById(
    id: number
  ) {

    const hotel =
      await hotelRepository.findById(
        id
      );

    if (!hotel) {

      throw new NotFoundException(
        "Hotel introuvable"
      );
    }

    return HotelMapper.toDto(
      hotel
    );

  },

  async createHotel(
    data: {

      nom_hot: string;

      nb_etoiles_hot: number;

      pays_hot: string;

      ville_hot: string;

      adresse_hot: string;

    }
  ) {

    const hotel =
      await hotelRepository.create(
        data
      );

    return HotelMapper.toDto(
      hotel
    );

  },

  async updateHotel(
    id: number,
    data: {

      nom_hot?: string;

      nb_etoiles_hot?: number;

      pays_hot?: string;

      ville_hot?: string;

      adresse_hot?: string;

    }
  ) {

    await this.getHotelById(
      id
    );

    const hotel =
      await hotelRepository.update(
        id,
        data
      );

    return HotelMapper.toDto(
      hotel
    );

  },

  async deleteHotel(
    id: number
  ) {

    await this.getHotelById(
      id
    );

    return hotelRepository.delete(
      id
    );

  },

};
