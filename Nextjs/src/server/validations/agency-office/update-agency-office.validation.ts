
import { z } from "zod";

export const updateAgencyOfficeSchema = z.object({

  type: z.string().min(1).optional(),

  country: z.string().min(1).optional(),

  city: z.string().min(1).optional(),

  address: z.string().min(1).optional(),

  rib: z.string().optional(),

  iban: z.string().optional(),

});

export type UpdateAgencyOfficeValidation =
  z.infer<typeof updateAgencyOfficeSchema>;
  