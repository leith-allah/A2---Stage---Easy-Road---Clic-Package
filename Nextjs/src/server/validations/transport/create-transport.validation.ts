
import { z } from "zod";

export const createTransportSchema = z.object({

  trajet: z
    .string()
    .trim()
    .min(2, "Le trajet est obligatoire.")
    .max(50),

  company: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable(),

});

export type CreateTransportInput =

  z.infer<typeof createTransportSchema>;
  