
import { PrismaFlightRepository } from "@/server/repositories/prisma/prisma-flight.repository";

import { FlightMapper } from "@/server/mappers/flight.mapper";

import { NotFoundException } from "@/server/exceptions/not-found.exception";

const flightRepository =
    new PrismaFlightRepository();

export const flightQueryService = {

    async getAllFlights() {

        const flights =
            await flightRepository.findAll();

        return flights.map(

            (flight) =>
                FlightMapper.toDto(flight),

        );

    },

    async getFlightById(
        id: number,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        return FlightMapper.toDto(
            flight,
        );

    },

};
