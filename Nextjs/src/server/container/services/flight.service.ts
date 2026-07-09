
import { FlightService }
from "@/server/services/flight.service";

import { flightRepository }
from "../repositories/flight.repository";

export const flightService =

    new FlightService(

        flightRepository

    );
    