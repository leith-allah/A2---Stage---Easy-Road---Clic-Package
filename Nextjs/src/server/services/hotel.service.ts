
import { hotelRepository }
from "@/server/repositories/hotel.repository";

import { NotFoundException }
from "@/server/utils/api-error";

export const hotelService = {

  async getAllHotels() {

    return hotelRepository.findAll();

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

    return hotel;

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

    return hotelRepository.create(
      data
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

    return hotelRepository.update(
      id,
      data
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
