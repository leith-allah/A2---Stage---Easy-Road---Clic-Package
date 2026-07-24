
import { FlightService }
from "@/server/services/flight.service";

import { flightRepository }
from "../repositories/flight.repository";

import { airlineRepository }
from "../repositories/airline.repository";

import { airportRepository }
from "../repositories/airport.repository";

export const flightService =

    new FlightService(

        flightRepository,

        airlineRepository,

        airportRepository,

    );
    