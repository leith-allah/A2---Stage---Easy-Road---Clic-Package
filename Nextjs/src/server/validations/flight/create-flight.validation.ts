
import { z } from "zod";

export const createFlightSchema = z.object({

  airline:
    z.string().min(2).max(50),

  departureLocation:
    z.string().min(2).max(50),

  destination:
    z.string().min(2).max(50),

  departureDate:
    z.coerce.date(),

  departureTime:
    z.coerce.date(),

  arrivalTime:
    z.coerce.date(),

  returnDate:
    z.coerce.date().nullable().optional(),

  returnDepartureTime:
    z.coerce.date().nullable().optional(),

  returnArrivalTime:
    z.coerce.date().nullable().optional(),

  flightNumber:
    z.string().min(2).max(50),

});

export type CreateFlightInput =
  z.infer<typeof createFlightSchema>;
  