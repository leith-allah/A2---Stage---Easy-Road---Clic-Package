
import { Excursion }

from "@/server/entities/excursion.entity";

import {

  CreateExcursionDto,

}

from "@/server/dto/excursion/create-excursion.dto";

export class ExcursionBuilder {

  static fromDto(

    dto: CreateExcursionDto,

  ): Excursion {

    return new Excursion(

      0,

      dto.name,

      dto.location,

      dto.description,

    );

  }

}
