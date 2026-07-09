
import { z } from "zod";

export const updateTransportSchema = z.object({

  trajet: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .optional(),

  company: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable(),

});

export type UpdateTransportInput =

  z.infer<typeof updateTransportSchema>;
  