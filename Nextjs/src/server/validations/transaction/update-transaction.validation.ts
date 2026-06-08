
import { z } from "zod";

export const updateTransactionSchema =
  z.object({

    type:
      z.string()
       .optional(),

    status:
      z.string()
       .optional(),

  });
  