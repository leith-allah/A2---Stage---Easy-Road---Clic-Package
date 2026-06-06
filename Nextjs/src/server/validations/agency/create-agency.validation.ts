
import { z } from "zod";

export const createAgencySchema = z.object({

  mle_agence: z
    .string()
    .min(1),

  nom_agence: z
    .string()
    .min(1),

  dc_agence: z.coerce.date(),

  sj_agence: z
    .string()
    .min(1),

});

export type CreateAgencyValidation =
  z.infer<
    typeof createAgencySchema
  >;
  