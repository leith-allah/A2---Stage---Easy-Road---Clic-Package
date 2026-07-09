
import { Flight } from "@/server/entities/flight.entity";

import { FlightDto }
from "@/server/dto/flight/flight.dto";

export class FlightMapper {

  static toEntity(prismaFlight: {

    id_vol: bigint;

    compagnie_vol: string;

    lieu_depart_vol: string;

    destination_vol: string;

    date_aller_vol: Date;

    heure_depart_aller_vol: Date;

    heure_arrivee_aller_vol: Date;

    date_retour_vol: Date | null;

    heure_depart_retour_vol: Date | null;

    heure_arrivee_retour_vol: Date | null;

    num_vol: string;

  }): Flight {

    return new Flight(

      Number(prismaFlight.id_vol),

      prismaFlight.compagnie_vol,

      prismaFlight.lieu_depart_vol,

      prismaFlight.destination_vol,

      prismaFlight.date_aller_vol,

      prismaFlight.heure_depart_aller_vol,

      prismaFlight.heure_arrivee_aller_vol,

      prismaFlight.date_retour_vol,

      prismaFlight.heure_depart_retour_vol,

      prismaFlight.heure_arrivee_retour_vol,

      prismaFlight.num_vol,

    );

  }

  static toEntities(

    flights: {

      id_vol: bigint;

      compagnie_vol: string;

      lieu_depart_vol: string;

      destination_vol: string;

      date_aller_vol: Date;

      heure_depart_aller_vol: Date;

      heure_arrivee_aller_vol: Date;

      date_retour_vol: Date | null;

      heure_depart_retour_vol: Date | null;

      heure_arrivee_retour_vol: Date | null;

      num_vol: string;

    }[]

  ): Flight[] {

    return flights.map(

      flight => FlightMapper.toEntity(flight)

    );

  }

  static toDto(
    flight: Flight
  ): FlightDto {

    return {

      id: flight.id,

      airline: flight.airline,

      departureLocation: flight.departureLocation,

      destination: flight.destination,

      departureDate: flight.departureDate.toISOString(),

      departureTime: flight.departureTime.toISOString(),

      arrivalTime: flight.arrivalTime.toISOString(),

      returnDate:
        flight.returnDate
          ? flight.returnDate.toISOString()
          : null,

      returnDepartureTime:
        flight.returnDepartureTime
          ? flight.returnDepartureTime.toISOString()
          : null,

      returnArrivalTime:
        flight.returnArrivalTime
          ? flight.returnArrivalTime.toISOString()
          : null,

      flightNumber: flight.flightNumber,

    };

  }

}
