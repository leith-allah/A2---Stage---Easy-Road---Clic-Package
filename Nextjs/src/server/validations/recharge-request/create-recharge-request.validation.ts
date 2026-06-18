
import { z } from "zod";

export const createRechargeRequestSchema =
  z.object({

    amount:
      z.number()
       .positive(),

    comment:
      z.string()
       .optional(),

  });
  