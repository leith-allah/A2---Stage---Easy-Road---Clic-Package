
import { Airline } from "@/server/entities/airline.entity";
import { AirlineDto } from "@/server/dto/airline/airline.dto";
import { AirlinePersistence } from "@/server/persistence/airline.persistence";

export class AirlineMapper {

  static toEntity(
    prismaAirline: AirlinePersistence,
  ): Airline {

    return new Airline(

      prismaAirline.id_compagnie,

      prismaAirline.code_iata_compagnie,

      prismaAirline.code_icao_compagnie,

      prismaAirline.nom_compagnie,

      prismaAirline.site_compagnie,

    );

  }

  static toEntities(
    airlines: AirlinePersistence[],
  ): Airline[] {

    return airlines.map(
      AirlineMapper.toEntity,
    );

  }

  static toDto(
    airline: Airline,
  ): AirlineDto {

    return {

      id: airline.getId(),

      name: airline.getName(),

      iataCode: airline.getIataCode(),

      icaoCode: airline.getIcaoCode(),

      website: airline.getWebsite(),

    };

  }

}
