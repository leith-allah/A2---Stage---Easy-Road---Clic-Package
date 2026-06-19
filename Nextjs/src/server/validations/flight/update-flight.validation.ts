
import { z } from "zod";

export const updateFlightSchema =
  z.object({

    airline:
      z.string()
        .min(2)
        .max(50)
        .optional(),

    departureLocation:
      z.string()
        .min(2)
        .max(50)
        .optional(),

    destination:
      z.string()
        .min(2)
        .max(50)
        .optional(),

    departureDate:
      z.string()
       .optional(),

    departureTime:
      z.string()
       .optional(),

    arrivalTime:
      z.string()
       .optional(),

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
        .max(50)
        .optional(),

  });

export type UpdateFlightInput =
  z.infer<
    typeof updateFlightSchema
  >;
  