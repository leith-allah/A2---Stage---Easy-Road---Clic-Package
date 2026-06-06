
import { z } from "zod";

export const updateExcursionSchema = z.object({

  nom_exc: z
    .string()
    .min(2)
    .max(255)
    .optional(),

  lieu_exc: z
    .string()
    .min(2)
    .max(50)
    .optional(),

  description_exc: z
    .string()
    .min(5)
    .optional(),

});

export type UpdateExcursionInput =
  z.infer<typeof updateExcursionSchema>;
  