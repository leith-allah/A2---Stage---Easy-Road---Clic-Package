
import { z } from "zod";

export const createHotelSchema =
  z.object({

    name:
      z.string()
        .min(2)
        .max(100),

    stars:
      z.number()
        .min(1)
        .max(7),

    country:
      z.string()
        .min(2)
        .max(50),

    city:
      z.string()
        .min(2)
        .max(50),

    address:
      z.string()
        .min(2)
        .max(255),

  });

export type CreateHotelInput =
  z.infer<
    typeof createHotelSchema
  >;
