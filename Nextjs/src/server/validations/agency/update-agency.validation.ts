
import { z }
from "zod";

export const updateAgencySchema =
  z.object({

    mle_agence:
      z.string().optional(),

    nom_agence:
      z.string().optional(),

    dc_agence:
      z.coerce.date().optional(),

    sj_agence:
      z.string().optional(),

  });
  