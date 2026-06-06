
import { z } from "zod";

export const updateAgencySchema = z.object({

  mle_agence: z
    .string()
    .min(1)
    .optional(),

  nom_agence: z
    .string()
    .min(1)
    .optional(),

  dc_agence: z
    .coerce
    .date()
    .optional(),

  sj_agence: z
    .string()
    .min(1)
    .optional(),

});

export type UpdateAgencyValidation =
  z.infer<
    typeof updateAgencySchema
  >;
  