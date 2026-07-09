
import { Hotel }

from "@/server/entities/hotel.entity";

import {

  CreateHotelDto,

}

from "@/server/dto/hotel/create-hotel.dto";

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

}
