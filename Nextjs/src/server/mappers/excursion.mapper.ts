
import { Excursion } from "@/server/entities/excursion.entity";

import { ExcursionDto } from "@/server/dto/excursion/excursion.dto";

export class ExcursionMapper {

  static toEntity(prismaExcursion: {

    id_exc: bigint;

    nom_exc: string;

    lieu_exc: string;

    description_exc: string;

  }): Excursion {

    return new Excursion(

      Number(prismaExcursion.id_exc),

      prismaExcursion.nom_exc,

      prismaExcursion.lieu_exc,

      prismaExcursion.description_exc,

    );

  }

  static toEntities(

    excursions: {

      id_exc: bigint;

      nom_exc: string;

      lieu_exc: string;

      description_exc: string;

    }[]

  ): Excursion[] {

    return excursions.map(

      excursion =>

        ExcursionMapper.toEntity(

          excursion

        )

    );

  }

  static toDto(

    excursion: Excursion,

  ): ExcursionDto {

    return {

      id: excursion.id,

      name: excursion.name,

      location: excursion.location,

      description: excursion.description,

    };

  }

}
