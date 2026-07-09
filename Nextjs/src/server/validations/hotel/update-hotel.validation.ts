
import { z } from "zod";

export const updateHotelSchema =
  z.object({

    name:
      z.string()
        .min(2)
        .max(100)
        .optional(),

    stars:
      z.number()
        .min(1)
        .max(7)
        .optional(),

    country:
      z.string()
        .min(2)
        .max(50)
        .optional(),

    city:
      z.string()
        .min(2)
        .max(50)
        .optional(),

    address:
      z.string()
        .min(2)
        .max(255)
        .optional(),

  });

export type UpdateHotelInput =
  z.infer<
    typeof updateHotelSchema
  >;
