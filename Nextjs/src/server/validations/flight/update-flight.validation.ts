
import { z } from "zod";

import {
  FlightStatusValue,
} from "@/server/entities/value-objects/flight-status.value-object";

export const updateFlightSchema = z.object({

  status: z
    .nativeEnum(FlightStatusValue)
    .optional(),

  flightNumber:
    z.string().min(2).max(50).optional(),

  departureDateTime:
    z.string().datetime().optional(),

  arrivalDateTime:
    z.string().datetime().optional(),

  departureAirportId:
    z.number().int().positive().optional(),

  arrivalAirportId:
    z.number().int().positive().optional(),

  airlineId:
    z.number().int().positive().optional(),

});

export type UpdateFlightInput =
  z.infer<typeof updateFlightSchema>;
