
import { HotelService } from "@/server/services/hotel.service";

import { CreateHotelDto } from "@/server/dto/hotel/create-hotel.dto";

import { UpdateHotelDto } from "@/server/dto/hotel/update-hotel.dto";

export class HotelController {

  constructor(

    private readonly hotelService: HotelService,

  ) {}

  async getAll() {

    return this.hotelService.getAllHotels();

  }

  async getById(

    id: number,

  ) {

    return this.hotelService.getHotelById(id);

  }

  async create(

    dto: CreateHotelDto,

  ) {

    return this.hotelService.createHotel(dto);

  }

  async update(

    id: number,

    dto: UpdateHotelDto,

  ) {

    return this.hotelService.updateHotel(

      id,

      dto,

    );

  }

  async delete(

    id: number,

  ) {

    return this.hotelService.deleteHotel(id);

  }

}
