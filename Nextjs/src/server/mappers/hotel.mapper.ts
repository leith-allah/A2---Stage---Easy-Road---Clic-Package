
import { Hotel } from "@/server/entities/hotel.entity";
import { HotelDto } from "@/server/dto/hotel/hotel.dto";

export class HotelMapper {

  static toEntity(prismaHotel: {

    id_hot: bigint;

    nom_hot: string;

    pays_hot: string;

    ville_hot: string;

    adresse_hot: string;

    nb_etoiles_hot: number;

  }): Hotel {

    return new Hotel(

      Number(prismaHotel.id_hot),

      prismaHotel.nom_hot,

      prismaHotel.pays_hot,

      prismaHotel.ville_hot,

      prismaHotel.adresse_hot,

      prismaHotel.nb_etoiles_hot,

    );

  }

  static toEntities(

    hotels: {

      id_hot: bigint;

      nom_hot: string;

      pays_hot: string;

      ville_hot: string;

      adresse_hot: string;

      nb_etoiles_hot: number;

    }[]

  ): Hotel[] {

    return hotels.map(

      HotelMapper.toEntity

    );

  }

  static toDto(
    hotel: Hotel
  ): HotelDto {

    return {

      id: hotel.id,

      name: hotel.name,

      country: hotel.country,

      city: hotel.city,

      address: hotel.address,

      stars: hotel.stars,

    };

  }

}
