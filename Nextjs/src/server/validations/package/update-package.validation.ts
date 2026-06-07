
import { z } from "zod";

export const updatePackageSchema =
  z.object({

    name:
      z.string().min(2).optional(),

    country:
      z.string().min(2).optional(),

    destination:
      z.string().min(2).optional(),

    image:
      z.string().optional(),

    description:
      z.string().optional(),

    departureDate:
      z.string().optional(),

    returnDate:
      z.string().optional(),

    basePrice:
      z.number().positive().optional(),

    availableSeats:
      z.number().int().positive().optional(),

  });

export type UpdatePackageInput =
  z.infer<
    typeof updatePackageSchema
  >;
  