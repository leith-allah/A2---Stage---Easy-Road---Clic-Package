
import { Transport } from "@/server/entities/transport.entity";

import { TransportDto } from "@/server/dto/transport/transport.dto";

export class TransportMapper {

  static toEntity(prismaTransport: {

    id_transp: bigint;

    trajet_transp: string;

    societe_transp: string | null;

  }): Transport {

    return new Transport(

      Number(prismaTransport.id_transp),

      prismaTransport.trajet_transp,

      prismaTransport.societe_transp,

    );

  }

  static toEntities(

    transports: {

      id_transp: bigint;

      trajet_transp: string;

      societe_transp: string | null;

    }[]

  ): Transport[] {

    return transports.map(

      transport =>

        TransportMapper.toEntity(

          transport

        )

    );

  }

  static toDto(

    transport: Transport

  ): TransportDto {

    return {

      id: transport.id,

      route: transport.route,

      company: transport.company,

    };

  }

}
