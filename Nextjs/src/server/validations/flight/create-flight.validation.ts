
import { z } from "zod";

import {
  FlightStatusValue,
} from "@/server/entities/value-objects/flight-status.value-object";

export const createFlightSchema = z.object({

  status: z.nativeEnum(FlightStatusValue).default(
    FlightStatusValue.ACTIVE,
  ),

  flightNumber:
    z.string().min(2).max(50),

  departureDateTime:
    z.string().datetime(),

  arrivalDateTime:
    z.string().datetime(),

  departureAirportId:
    z.number().int().positive(),

  arrivalAirportId:
    z.number().int().positive(),

  airlineId:
    z.number().int().positive(),

});

export type CreateFlightInput =
  z.infer<typeof createFlightSchema>;
