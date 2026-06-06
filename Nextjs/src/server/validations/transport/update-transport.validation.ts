
import { z } from "zod";

export const updateTransportSchema =
  z.object({

    route:
      z.string()
        .min(1)
        .max(50)
        .optional(),

    company:
      z.string()
        .max(50)
        .optional(),

  });
  