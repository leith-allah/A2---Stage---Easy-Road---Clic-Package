
import { z } from "zod";

export const createExcursionSchema = z.object({

  nom_exc: z
    .string()
    .min(2)
    .max(255),

  lieu_exc: z
    .string()
    .min(2)
    .max(50),

  description_exc: z
    .string()
    .min(5),

});

export type CreateExcursionInput =
  z.infer<typeof createExcursionSchema>;
  