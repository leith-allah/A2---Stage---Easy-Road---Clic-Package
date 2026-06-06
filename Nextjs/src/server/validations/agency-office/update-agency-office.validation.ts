
import { z } from "zod";

export const updateAgencyOfficeSchema =
  z.object({

    type:
      z.string().optional(),

    country:
      z.string().optional(),

    city:
      z.string().optional(),

    address:
      z.string().optional(),

    rib:
      z.string().optional(),

    iban:
      z.string().optional(),

  });
  