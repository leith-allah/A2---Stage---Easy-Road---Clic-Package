
import { Airport } from "@/server/entities/airport.entity";

import { AirportDto } from "@/server/dto/airport/airport.dto";

import { AirportPersistence } from "@/server/persistence/airport.persistence";

import { CityMapper } from "./city.mapper";

export class AirportMapper {

  static toEntity(
    prismaAirport: AirportPersistence,
  ): Airport {

    return new Airport(

      prismaAirport.id_aeroport,

      prismaAirport.code_iata_aeroport,

      prismaAirport.code_icao_aeroport,

      prismaAirport.nom_aeroport,

      prismaAirport.latitude_aeroport,

      prismaAirport.longitude_aeroport,

      CityMapper.toEntity(
        prismaAirport.ville,
      ),

    );

  }

  static toEntities(
    airports: AirportPersistence[],
  ): Airport[] {

    return airports.map(
      AirportMapper.toEntity,
    );

  }

  static toDto(
    airport: Airport,
  ): AirportDto {

    return {

      id: airport.getId(),

      name: airport.getName(),

      iataCode: airport.getIataCode(),

      icaoCode: airport.getIcaoCode(),

      latitude: airport.getLatitude(),

      longitude: airport.getLongitude(),

      city: CityMapper.toDto(
        airport.getCity(),
      ),

    };

  }

}
