
import { z } from "zod";

export const updateBookingSchema =
  z.object({

    status:
      z.string().optional(),

  });

export type UpdateBookingInput =
  z.infer<
    typeof updateBookingSchema
  >;
  