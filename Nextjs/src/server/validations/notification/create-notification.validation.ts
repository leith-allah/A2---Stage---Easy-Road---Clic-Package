
import { z } from "zod";

export const createNotificationSchema =
  z.object({

    userId:
      z.number(),

    status:
      z.string(),

    amount:
      z.number(),

    comment:
      z.string()
       .optional(),
  });
  