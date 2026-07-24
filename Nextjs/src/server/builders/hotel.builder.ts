
import { Hotel }
from "@/server/entities/hotel.entity";

import { CreateHotelDto }
from "@/server/dto/hotel/create-hotel.dto";

import { UpdateHotelDto }
from "@/server/dto/hotel/update-hotel.dto";


export class HotelBuilder {

  static fromDto(

    dto: CreateHotelDto,

  ): Hotel {

    return new Hotel(

      0,

      dto.name,

      dto.country,

      dto.city,

      dto.address,

      dto.stars,

    );

  }

  static updateFromDto(

      existing: Hotel,

      dto: UpdateHotelDto,

  ): Hotel {

      return new Hotel(

          existing.id,

          dto.name
              ?? existing.name,

          dto.country
              ?? existing.country,

          dto.city
              ?? existing.city,

          dto.address
              ?? existing.address,

          dto.stars
              ?? existing.stars,

      );

  }

}
