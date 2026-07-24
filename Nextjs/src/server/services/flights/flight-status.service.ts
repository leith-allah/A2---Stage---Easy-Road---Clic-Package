
import { NotFoundException } from "@/server/exceptions/not-found.exception";

import { PrismaFlightRepository }
from "@/server/repositories/prisma/prisma-flight.repository";

import { FlightAggregate }
from "@/server/aggregates/flight.aggregate";

const flightRepository =
    new PrismaFlightRepository();

export const flightStatusService = {

    async activateFlight(
        id: number,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        const aggregate =
            new FlightAggregate(
                flight,
            );

        aggregate.activate();

        return await flightRepository.updateAggregate(
            aggregate,
        );

    },

    async disableFlight(
        id: number,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        const aggregate =
            new FlightAggregate(
                flight,
            );

        aggregate.inactivate();

        return await flightRepository.updateAggregate(
            aggregate,
        );

    },

    async archiveFlight(
        id: number,
    ) {

        const flight =
            await flightRepository.findById(id);

        if (!flight) {

            throw new NotFoundException(
                "Vol introuvable",
            );

        }

        const aggregate =
            new FlightAggregate(
                flight,
            );

        aggregate.archive();

        return await flightRepository.updateAggregate(
            aggregate,
        );

    },

};
