
import { z } from "zod";

export const createPackageSchema =
  z.object({

    name:
      z.string().min(2),

    country:
      z.string().min(2),

    destination:
      z.string().min(2),

    image:
      z.string().optional(),

    description:
      z.string().optional(),

    departureDate:
      z.string(),

    returnDate:
      z.string(),

    basePrice:
      z.number().positive(),

    availableSeats:
      z.number().int().positive(),

  });

export type CreatePackageInput =
  z.infer<
    typeof createPackageSchema
  >;
  