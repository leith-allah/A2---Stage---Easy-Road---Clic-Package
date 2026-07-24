
import { HotelRepository } from "@/server/repositories/interfaces/hotel.repository.interface";

import { HotelMapper } from "@/server/mappers/hotel.mapper";
import { HotelBuilder } from "@/server/builders/hotel.builder";

import { CreateHotelDto } from "@/server/dto/hotel/create-hotel.dto";
import { UpdateHotelDto } from "@/server/dto/hotel/update-hotel.dto";
import { HotelDto } from "@/server/dto/hotel/hotel.dto";

import { NotFoundException } from "@/server/utils/api-error";

export class HotelService {

  constructor(

    private readonly repository: HotelRepository,

  ) {}

  async getAllHotels(): Promise<HotelDto[]> {

    const hotels =
      await this.repository.findAll();

    return hotels.map(
      HotelMapper.toDto,
    );

  }

  async getHotelById(
    id: number,
  ): Promise<HotelDto> {

    const hotel =
      await this.repository.findById(id);

    if (!hotel) {

      throw new NotFoundException(
        "Hôtel introuvable",
      );

    }

    return HotelMapper.toDto(hotel);

  }

  async createHotel(
    dto: CreateHotelDto,
  ): Promise<HotelDto> {

    const aggregate =
      HotelBuilder.fromDto(dto);

    const created =
      await this.repository.createAggregate(
        aggregate,
      );

    return HotelMapper.toDto(created);

  }

  async updateHotel(
    id: number,
    dto: UpdateHotelDto,
  ): Promise<HotelDto> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Hôtel introuvable",
      );

    }

    const aggregate =
      HotelBuilder.updateFromDto(
        existing,
        dto,
      );

    const updated =
      await this.repository.updateAggregate(
        aggregate,
      );

    return HotelMapper.toDto(updated);

  }

  async deleteHotel(
    id: number,
  ): Promise<void> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Hôtel introuvable",
      );

    }

    await this.repository.delete(id);

  }

}
