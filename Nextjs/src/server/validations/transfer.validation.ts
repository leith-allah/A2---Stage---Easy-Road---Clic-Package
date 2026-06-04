
import { z } from "zod";

export const transferSchema =
  z.object({

    recipientId:
      z.number(),

    amount:
      z.number()
       .positive(),
  });
  