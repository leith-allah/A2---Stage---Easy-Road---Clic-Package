
import { Excursion }
from "@/server/entities/excursion.entity";

import { CreateExcursionDto }
from "@/server/dto/excursion/create-excursion.dto";

import { UpdateExcursionDto }
from "@/server/dto/excursion/update-excursion.dto";


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

  static updateFromDto(

      existing: Excursion,

      dto: UpdateExcursionDto,

  ): Excursion {

      return new Excursion(

          existing.id,

          dto.name
              ?? existing.name,

          dto.location
              ?? existing.location,

          dto.description
              ?? existing.description,

      );

  }

}
