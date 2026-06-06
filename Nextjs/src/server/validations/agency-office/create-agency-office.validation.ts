
import { z } from "zod";

export const createAgencyOfficeSchema = z.object({

  agencyId: z.number(),

  code: z.string().min(1),

  type: z.string().min(1),

  country: z.string().min(1),

  city: z.string().min(1),

  address: z.string().min(1),

  approvalNumber: z.string().min(1),

  rib: z.string().optional(),

  iban: z.string().optional(),

});

export type CreateAgencyOfficeValidation =
  z.infer<typeof createAgencyOfficeSchema>;
  