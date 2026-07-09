
import { HotelRepository } from "@/server/repositories/interfaces/hotel.repository.interface";

import { HotelMapper } from "@/server/mappers/hotel.mapper";

import { CreateHotelDto } from "@/server/dto/hotel/create-hotel.dto";

import { UpdateHotelDto } from "@/server/dto/hotel/update-hotel.dto";

import { Hotel } from "@/server/entities/hotel.entity";

import { NotFoundException } from "@/server/utils/api-error";

export class HotelService {

  constructor(

    private readonly repository: HotelRepository,

  ) {}

  async getAllHotels() {

    const hotels = await this.repository.findAll();

    return hotels.map(

      hotel => HotelMapper.toDto(hotel)

    );

  }

  async getHotelById(

    id: number,

  ) {

    const hotel = await this.repository.findById(id);

    if (!hotel) {

      throw new NotFoundException(

        "Hôtel introuvable"

      );

    }

    return HotelMapper.toDto(hotel);

  }

  async createHotel(

    dto: CreateHotelDto,

  ) {

    const hotel = new Hotel(

      0,

      dto.name,

      dto.country,

      dto.city,

      dto.address,

      dto.stars,

    );

    const created = await this.repository.create(

      hotel

    );

    return HotelMapper.toDto(created);

  }

  async updateHotel(

    id: number,

    dto: UpdateHotelDto,

  ) {

    const exists = await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Hôtel introuvable"

      );

    }

    const updated = await this.repository.update(

      id,

      dto,

    );

    return HotelMapper.toDto(updated);

  }

  async deleteHotel(

    id: number,

  ) {

    const exists = await this.repository.findById(id);

    if (!exists) {

      throw new NotFoundException(

        "Hôtel introuvable"

      );

    }

    const deleted = await this.repository.delete(id);

    return HotelMapper.toDto(deleted);

  }

}
