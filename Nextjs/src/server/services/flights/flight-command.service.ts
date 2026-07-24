
import { CreateFlightDto } from "@/server/dto/flight/create-flight.dto";
import { UpdateFlightDto } from "@/server/dto/flight/update-flight.dto";

import { Flight } from "@/server/entities/flight.entity";

import {
    FlightStatus,
} from "@/server/entities/value-objects/flight-status.value-object";

import { FlightAggregate } from "@/server/aggregates/flight.aggregate";

import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { PrismaFlightRepository } from "@/server/repositories/prisma/prisma-flight.repository";
import { PrismaAirlineRepository } from "@/server/repositories/prisma/prisma-airline.repository";
import { PrismaAirportRepository } from "@/server/repositories/prisma/prisma-airport.repository";

const flightRepository =
    new PrismaFlightRepository();

const airlineRepository =
    new PrismaAirlineRepository();

const airportRepository =
    new PrismaAirportRepository();

export const flightCommandService = {

    async createFlight(
        dto: CreateFlightDto,
    ) {

        const airline =
            await airlineRepository.findById(dto.airlineId);

        if (!airline) {

            throw new NotFoundException(
                "Compagnie aérienne introuvable",
            );

        }

        const departureAirport =
            await airportRepository.findById(dto.departureAirportId);

        if (!departureAirport) {

            throw new NotFoundException(
                "Aéroport de départ introuvable",
            );

        }

        const arrivalAirport =
            await airportRepository.findById(dto.arrivalAirportId);

        if (!arrivalAirport) {

            throw new NotFoundException(
                "Aéroport d'arrivée introuvable",
            );

        }

        const flight =
            new Flight(

                0,

                new FlightStatus(dto.status),

                dto.flightNumber,

                new Date(dto.departureDateTime),

                new Date(dto.arrivalDateTime),

                departureAirport,

                arrivalAirport,

                airline,

            );

        const aggregate =
            new FlightAggregate(flight);

        return await flightRepository.createAggregate(
            aggregate,
        );

    },

    async updateFlight(
        id: number,
        dto: UpdateFlightDto,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        if (dto.flightNumber !== undefined) {

            flight.changeFlightNumber(
                dto.flightNumber,
            );

        }

        if (dto.departureDateTime !== undefined) {

            flight.changeDepartureDate(
                new Date(dto.departureDateTime),
            );

        }

        if (dto.arrivalDateTime !== undefined) {

            flight.changeArrivalDate(
                new Date(dto.arrivalDateTime),
            );

        }

        if (dto.airlineId !== undefined) {

            const airline =
                await airlineRepository.findById(dto.airlineId);

            if (!airline) {

                throw new NotFoundException(
                    "Compagnie aérienne introuvable",
                );

            }

            flight.changeAirline(
                airline,
            );

        }

        if (dto.departureAirportId !== undefined) {

            const airport =
                await airportRepository.findById(dto.departureAirportId);

            if (!airport) {

                throw new NotFoundException(
                    "Aéroport de départ introuvable",
                );

            }

            flight.changeDepartureAirport(
                airport,
            );

        }

        if (dto.arrivalAirportId !== undefined) {

            const airport =
                await airportRepository.findById(dto.arrivalAirportId);

            if (!airport) {

                throw new NotFoundException(
                    "Aéroport d'arrivée introuvable",
                );

            }

            flight.changeArrivalAirport(
                airport,
            );

        }

        if (dto.status !== undefined) {

            if (dto.status === flight.getStatus().getValue()) {

                // rien

            } else {

                switch (dto.status) {

                    case "ACTIVE":
                        flight.activate();
                        break;

                    case "INACTIVE":
                        flight.inactivate();
                        break;

                    case "ARCHIVED":
                        flight.archive();
                        break;

                }

            }

        }

        const aggregate =
            new FlightAggregate(flight);

        return await flightRepository.updateAggregate(
            aggregate,
        );

    },

    async deleteFlight(
        id: number,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        await flightRepository.delete(id);

        return {

            success: true,

        };

    },

};
