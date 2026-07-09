
import { Flight } from "@/server/entities/flight.entity";

import { FlightRepository }
from "@/server/repositories/interfaces/flight.repository.interface";

import { FlightMapper }
from "@/server/mappers/flight.mapper";

import { CreateFlightDto }
from "@/server/dto/flight/create-flight.dto";

import { FlightDto }
from "@/server/dto/flight/flight.dto";

import { UpdateFlightDto }
from "@/server/dto/flight/update-flight.dto";

import { NotFoundException }
from "@/server/utils/api-error";

export class FlightService {

  constructor(

    private repository: FlightRepository

  ) {}

  async findAll(): Promise<FlightDto[]> {

    const flights =
      await this.repository.findAll();

    return flights.map(

      (flight) =>
        FlightMapper.toDto(flight)

    );

  }

  async findById(
    id: number
  ): Promise<FlightDto> {

    const flight =
      await this.repository.findById(id);

    if (!flight) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    return FlightMapper.toDto(flight);

  }

  async create(
    dto: CreateFlightDto
  ): Promise<FlightDto> {

    const flight =
      new Flight(

        0,

        dto.airline,

        dto.departureLocation,

        dto.destination,

        new Date(dto.departureDate),

        new Date(`1970-01-01T${dto.departureTime}:00`),

        new Date(`1970-01-01T${dto.arrivalTime}:00`),

        dto.returnDate
          ? new Date(dto.returnDate)
          : null,

        dto.returnDepartureTime
          ? new Date(`1970-01-01T${dto.returnDepartureTime}:00`)
          : null,

        dto.returnArrivalTime
          ? new Date(`1970-01-01T${dto.returnArrivalTime}:00`)
          : null,

        dto.flightNumber

      );

    const created =
      await this.repository.create(flight);

    return FlightMapper.toDto(created);

  }

  async update(

    id: number,

    dto: UpdateFlightDto

  ): Promise<FlightDto> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    const updated =
      await this.repository.update(id, {

        airline: dto.airline,

        departureLocation: dto.departureLocation,

        destination: dto.destination,

        departureDate:
          dto.departureDate
            ? new Date(dto.departureDate)
            : undefined,

        departureTime:
          dto.departureTime
            ? new Date(`1970-01-01T${dto.departureTime}:00`)
            : undefined,

        arrivalTime:
          dto.arrivalTime
            ? new Date(`1970-01-01T${dto.arrivalTime}:00`)
            : undefined,

        returnDate:
          dto.returnDate
            ? new Date(dto.returnDate)
            : undefined,

        returnDepartureTime:
          dto.returnDepartureTime
            ? new Date(`1970-01-01T${dto.returnDepartureTime}:00`)
            : undefined,

        returnArrivalTime:
          dto.returnArrivalTime
            ? new Date(`1970-01-01T${dto.returnArrivalTime}:00`)
            : undefined,

        flightNumber:
          dto.flightNumber,

      });

    return FlightMapper.toDto(updated);

  }

  async delete(
    id: number
  ): Promise<void> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Vol introuvable"
      );

    }

    await this.repository.delete(id);

  }

}
