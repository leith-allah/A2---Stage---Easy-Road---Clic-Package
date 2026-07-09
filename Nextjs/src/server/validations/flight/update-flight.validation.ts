
import { z } from "zod";

export const updateFlightSchema = z.object({

  airline:
    z.string().min(2).max(50).optional(),

  departureLocation:
    z.string().min(2).max(50).optional(),

  destination:
    z.string().min(2).max(50).optional(),

  departureDate:
    z.coerce.date().optional(),

  departureTime:
    z.coerce.date().optional(),

  arrivalTime:
    z.coerce.date().optional(),

  returnDate:
    z.coerce.date().nullable().optional(),

  returnDepartureTime:
    z.coerce.date().nullable().optional(),

  returnArrivalTime:
    z.coerce.date().nullable().optional(),

  flightNumber:
    z.string().min(2).max(50).optional(),

});

export type UpdateFlightInput =
  z.infer<typeof updateFlightSchema>;
  