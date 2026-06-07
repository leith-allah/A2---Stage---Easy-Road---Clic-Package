
import { z } from "zod";

export const createBookingSchema =
  z.object({

    travelers:
      z.number().int().positive(),

    flightClass:
      z.string().min(1),

    roomType:
      z.string().min(1),

    pension:
      z.string().min(1),

    purchasePrice:
      z.number().positive(),

    discount:
      z.number().min(0),

    totalPrice:
      z.number().positive(),

    packageId:
      z.number().int().positive(),

    userId:
      z.number().int().positive(),

  });

export type CreateBookingInput =
  z.infer<
    typeof createBookingSchema
  >;
  