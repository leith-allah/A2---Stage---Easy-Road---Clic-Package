
import { ExcursionDto }
from "@/server/dto/excursion/excursion.dto";

export class ExcursionMapper {

  static toDto(
    excursion: any
  ): ExcursionDto {

    return {

      id:
        Number(
          excursion.id_exc
        ),

      name:
        excursion.nom_exc,

      location:
        excursion.lieu_exc,

      description:
        excursion.description_exc,

    };

  }

}
