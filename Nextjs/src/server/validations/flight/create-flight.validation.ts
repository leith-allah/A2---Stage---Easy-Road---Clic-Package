
import { z } from "zod";

export const createFlightSchema =
  z.object({

    airline:
      z.string()
        .min(2)
        .max(50),

    departureLocation:
      z.string()
        .min(2)
        .max(50),

    destination:
      z.string()
        .min(2)
        .max(50),

    departureDate:
      z.string(),

    departureTime:
      z.string(),

    arrivalTime:
      z.string(),

    returnDate:
      z.string()
       .optional(),

    returnDepartureTime:
      z.string()
       .optional(),

    returnArrivalTime:
      z.string()
       .optional(),

    flightNumber:
      z.string()
        .min(2)
        .max(50),

  });

export type CreateFlightInput =
  z.infer<
    typeof createFlightSchema
  >;
  