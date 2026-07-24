
import { FlightRepository } from "@/server/repositories/interfaces/flight.repository.interface";
import { AirlineRepository } from "@/server/repositories/interfaces/airline.repository.interface";
import { AirportRepository } from "@/server/repositories/interfaces/airport.repository.interface";

import { FlightMapper } from "@/server/mappers/flight.mapper";
import { FlightBuilder } from "@/server/builders/flight.builder";

import { CreateFlightDto } from "@/server/dto/flight/create-flight.dto";
import { UpdateFlightDto } from "@/server/dto/flight/update-flight.dto";
import { FlightDto } from "@/server/dto/flight/flight.dto";

import { FlightAggregate } from "@/server/aggregates/flight.aggregate";

import { NotFoundException } from "@/server/utils/api-error";

export class FlightService {

  constructor(

    private readonly repository: FlightRepository,

    private readonly airlineRepository: AirlineRepository,

    private readonly airportRepository: AirportRepository,

  ) {}

  async findAll(): Promise<FlightDto[]> {

    const flights =
      await this.repository.findAll();

    return flights.map(
      FlightMapper.toDto,
    );

  }

  async findById(
    id: number,
  ): Promise<FlightDto> {

    const flight =
      await this.repository.findById(id);

    if (!flight) {

      throw new NotFoundException(
        "Vol introuvable",
      );

    }

    return FlightMapper.toDto(flight);

  }

  async create(
    dto: CreateFlightDto,
  ): Promise<FlightDto> {

    const airline =
      await this.airlineRepository.findById(
        dto.airlineId,
      );

    if (!airline) {

      throw new NotFoundException(
        "Compagnie aérienne introuvable",
      );

    }

    const departureAirport =
      await this.airportRepository.findById(
        dto.departureAirportId,
      );

    if (!departureAirport) {

      throw new NotFoundException(
        "Aéroport de départ introuvable",
      );

    }

    const arrivalAirport =
      await this.airportRepository.findById(
        dto.arrivalAirportId,
      );

    if (!arrivalAirport) {

      throw new NotFoundException(
        "Aéroport d'arrivée introuvable",
      );

    }

    const flight =
      FlightBuilder.fromDto(

        dto,

        airline,

        departureAirport,

        arrivalAirport,

      );

    const aggregate =
      new FlightAggregate(flight);

    const created =
      await this.repository.createAggregate(
        aggregate,
      );

    return FlightMapper.toDto(created);

  }

  async update(

    id: number,

    dto: UpdateFlightDto,

  ): Promise<FlightDto> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Vol introuvable",
      );

    }

    const airline =
      dto.airlineId
        ? await this.airlineRepository.findById(dto.airlineId)
        : existing.getAirline();

    if (!airline) {

      throw new NotFoundException(
        "Compagnie aérienne introuvable",
      );

    }

    const departureAirport =
      dto.departureAirportId
        ? await this.airportRepository.findById(dto.departureAirportId)
        : existing.getDepartureAirport();

    if (!departureAirport) {

      throw new NotFoundException(
        "Aéroport de départ introuvable",
      );

    }

    const arrivalAirport =
      dto.arrivalAirportId
        ? await this.airportRepository.findById(dto.arrivalAirportId)
        : existing.getArrivalAirport();

    if (!arrivalAirport) {

      throw new NotFoundException(
        "Aéroport d'arrivée introuvable",
      );

    }

    const flight =
      FlightBuilder.updateFromDto(

        existing,

        dto,

        airline,

        departureAirport,

        arrivalAirport,

      );

    const aggregate =
      new FlightAggregate(flight);

    const updated =
      await this.repository.updateAggregate(
        aggregate,
      );

    return FlightMapper.toDto(updated);

  }

  async delete(
    id: number,
  ): Promise<void> {

    const existing =
      await this.repository.findById(id);

    if (!existing) {

      throw new NotFoundException(
        "Vol introuvable",
      );

    }

    await this.repository.delete(id);

  }

}
