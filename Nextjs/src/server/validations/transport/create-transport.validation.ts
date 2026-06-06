
import { z } from "zod";

export const createTransportSchema =
  z.object({

    route:
      z.string()
        .min(1)
        .max(50),

    company:
      z.string()
        .max(50)
        .optional(),

  });
  