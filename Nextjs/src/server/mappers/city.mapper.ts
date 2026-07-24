
import { City } from "@/server/entities/city.entity";
import { CityDto } from "@/server/dto/city/city.dto";
import { CityPersistence } from "@/server/persistence/city.persistence";

export class CityMapper {

  static toEntity(
    prismaCity: CityPersistence,
  ): City {

    return new City(

      prismaCity.id_ville,

      prismaCity.code_iata_ville,

      prismaCity.nom_ville,

      prismaCity.pays.nom_pays,

      prismaCity.latitude_ville,

      prismaCity.longitude_ville,

      prismaCity.fuseau_horaire_ville,

    );

  }

  static toEntities(
    cities: CityPersistence[],
  ): City[] {

    return cities.map(
      CityMapper.toEntity,
    );

  }

  static toDto(
    city: City,
  ): CityDto {

    return {

      id: city.getId(),

      iataCode: city.getIataCode(),

      name: city.getName(),

      country: city.getCountry(),

      latitude: city.getLatitude(),

      longitude: city.getLongitude(),

      timezone: city.getTimezone(),

    };

  }

}
