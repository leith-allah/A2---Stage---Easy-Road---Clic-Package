
import { HotelDto }
from "@/server/dto/hotel/hotel.dto";

export class HotelMapper {

  static toDto(
    hotel: any
  ): HotelDto {

    return {

      id:
        Number(
          hotel.id_hot
        ),

      name:
        hotel.nom_hot,

      stars:
        hotel.nb_etoiles_hot,

      country:
        hotel.pays_hot,

      city:
        hotel.ville_hot,

      address:
        hotel.adresse_hot,

    };

  }

}
