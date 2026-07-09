
import { Flight }

from "@/server/entities/flight.entity";

import {

  CreateFlightDto,

}

from "@/server/dto/flight/create-flight.dto";

export class FlightBuilder {

  static fromDto(

    dto: CreateFlightDto,

  ): Flight {

    return new Flight(

      0,

      dto.airline,

      dto.departureLocation,

      dto.destination,

      dto.departureDate,

      dto.departureTime,

      dto.arrivalTime,

      dto.returnDate ?? null,

      dto.returnDepartureTime ?? null,

      dto.returnArrivalTime ?? null,

      dto.flightNumber,

    );

  }

}
