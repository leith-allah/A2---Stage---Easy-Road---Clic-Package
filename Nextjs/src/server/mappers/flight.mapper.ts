
import { FlightDto }
from "@/server/dto/flight/flight.dto";

export class FlightMapper {

  static toDto(
    flight: any
  ): FlightDto {

    return {

      id:
        Number(
          flight.id_vol
        ),

      airline:
        flight.compagnie_vol,

      departureLocation:
        flight.lieu_depart_vol,

      destination:
        flight.destination_vol,

      departureDate:
        flight.date_aller_vol.toISOString(),

      departureTime:
        flight.heure_depart_aller_vol.toISOString(),

      arrivalTime:
        flight.heure_arrivee_aller_vol.toISOString(),

      returnDate:
        flight.date_retour_vol
          ?.toISOString(),

      returnDepartureTime:
        flight.heure_depart_retour_vol
          ?.toISOString(),

      returnArrivalTime:
        flight.heure_arrivee_retour_vol
          ?.toISOString(),

      flightNumber:
        flight.num_vol,

    };

  }

}
