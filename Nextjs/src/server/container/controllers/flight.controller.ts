
import { FlightController }
from "@/server/controllers/flight.controller";

import { flightService }
from "../services/flight.service";

export const flightController =

    new FlightController(

        flightService

    );
    